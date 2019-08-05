import React from "react"
import { Field, FieldProps } from "formik"

import { GoogleMap as SharedGoogleMap } from "components/generic/ui"
import { MapOptions } from "helpers"

import * as Styled from "./GoogleMap.styled"

interface IProps {
  name: string
}

export const GoogleMap: React.FC<IProps> = ({ name }) => (
  <Field name={name}>
    {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
      <Styled.MapContainer>
        <SharedGoogleMap defaultZoom={MapOptions.zoom} defaultCenter={MapOptions.position}>
          <SharedGoogleMap.Marker
            draggable
            position={value}
            onDragEnd={({ latLng }: google.maps.MouseEvent) =>
              setFieldValue(name, { lat: latLng.lat(), lng: latLng.lng() })
            }
          />
        </SharedGoogleMap>
      </Styled.MapContainer>
    )}
  </Field>
)
