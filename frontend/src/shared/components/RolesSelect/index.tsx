import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { useUserRoles } from "api/UserService/hooks";
import { FC } from "react";

export const RolesSelect: FC<TextFieldProps> = (props) => {
  const { data: roles } = useUserRoles({})

  return (
    <TextField rules={{ required: true }} size="small" SelectProps={{ multiple: true }} {...props} select>
      {roles?.map(role => (
        <MenuItem value={role.name} key={role.name}>{role.description}</MenuItem>
      ))}
    </TextField>
  )
}