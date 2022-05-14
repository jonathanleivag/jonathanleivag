import * as yup from 'yup'
import { IUiFormContact } from '../components'

export const contactValidation: yup.SchemaOf<IUiFormContact> = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(3, 'Su nombre al menos tiene que tener 3 caracteres')
      .required('El nombre es obligatorio'),
    email: yup
      .string()
      .email('El email no es válido')
      .required('El email es requerido'),
    message: yup
      .string()
      .min(30, 'El mensaje tiene que tener un mínimo de 30 caracteres')
      .required('El mensaje es obligatorio')
  })
