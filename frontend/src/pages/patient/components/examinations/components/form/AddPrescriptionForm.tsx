import { pick } from 'lodash'
import { Fragment } from 'react'
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from 'react-icons/hi2'
import Input from 'src/components/input/Input'
import Select from 'src/components/select/Select'
import { listMedicalType } from 'src/data/medical'
import { prescriptionDefaultValues } from 'src/pages/patient/components/examinations/components/ModalAddPrescription'
import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'

export interface AddPrescriptionFormProps {
  control: Control<any>
  register: UseFormRegister<any>
  errors: any
  name: string
  nameNote: string
}

export default function AddPrescriptionForm({ control, register, errors, name, nameNote }: AddPrescriptionFormProps) {
  const errorsObject = name.split('.').reduce((obj, key) => {
    return obj && obj[key]
  }, errors)
  const { append, remove, fields } = useFieldArray({
    control,
    name: name
  })

  const handleAddRow = () => {
    append(pick(prescriptionDefaultValues, [PRESCRIPTION_ROW_NAME]).prescriptionRow[0])
  }

  const handleRemoveRow = (index: number) => {
    remove(index)
  }
  return (
    <Fragment>
      <section className='mt-8 flex flex-col gap-4'>
        <article className='flex justify-between gap-2'>
          <h4 className='font-bold'>Prescription</h4>
          <button type='button' className='btn btn-circle' onClick={handleAddRow}>
            <HiOutlinePlusCircle className='h-8 w-8' />
          </button>
        </article>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr className='border-black/70'>
                    <th>Medicine name</th>
                    <th>Medicine type</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Usage</th>
                    <th className='text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((row, index) => (
                    <tr key={row.id} className='hover relative border-black/20'>
                      <td>
                        <Input
                          register={register}
                          name={`${name}.${index}.medicineName`}
                          placeholder='Medicine name'
                          errorMessage={errorsObject?.[index]?.medicineName?.message}
                        />
                      </td>
                      <td>
                        <Select
                          register={register}
                          name={`${name}.${index}.medicineType`}
                          options={listMedicalType}
                          errorMessage={errorsObject?.[index]?.medicineType?.message}
                          selectClass='lg:w-max'
                        />
                      </td>
                      <td>
                        <Input
                          register={register}
                          name={`${name}.${index}.quantity`}
                          placeholder='Quantity'
                          type='number'
                          errorMessage={errorsObject?.[index]?.quantity?.message}
                        />
                      </td>
                      <td>
                        <Input
                          register={register}
                          name={`${name}.${index}.amount`}
                          placeholder='Amount'
                          errorMessage={errorsObject?.[index]?.amount?.message}
                        />
                      </td>
                      <td>
                        <Input
                          register={register}
                          name={`${name}.${index}.usage`}
                          placeholder='Usage'
                          errorMessage={errorsObject?.[index]?.usage?.message}
                        />
                      </td>
                      <td>
                        {fields.length > 1 && (
                          <button
                            type='button'
                            className='btn btn-sm rounded-full'
                            onClick={() => handleRemoveRow(index)}
                          >
                            <HiOutlineMinusCircle className='h-8 w-8' />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-8 flex flex-col gap-4'>
        <h4 className='font-bold'>Note</h4>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body gap-6 p-6'>
            <textarea
              {...register(nameNote)}
              rows={6}
              className='textarea hover:border-primary focus:border-primary focus:outline-none'
              placeholder='Note'
            ></textarea>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
