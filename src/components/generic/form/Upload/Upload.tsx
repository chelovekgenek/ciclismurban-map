import React from "react"
import { Field, FieldProps } from "formik"
import { UploadChangeParam } from "antd/lib/upload"
import { UploadFile } from "antd/lib/upload/interface"

import { Icon } from "components/generic/ui"

import { FormItem } from "../FormItem"
import * as Styled from ".//Upload.styled"

interface IProps {
  name: string
  label?: string
}

export const Upload: React.FC<IProps> = ({ name, label }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => {
      return (
        <FormItem label={label} touched={form.touched[field.name]} error={form.errors[field.name]}>
          <Styled.Upload
            name={name}
            accept="image/*"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={({ file }: UploadChangeParam<UploadFile>) => {
              form.setFieldValue(name, file.originFileObj)
            }}
            customRequest={() => {}}
          >
            {field.value ? (
              <img src={URL.createObjectURL(field.value)} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Загрузить</div>
              </div>
            )}
          </Styled.Upload>
        </FormItem>
      )
    }}
  </Field>
)
