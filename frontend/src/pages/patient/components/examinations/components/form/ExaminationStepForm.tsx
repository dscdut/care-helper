import Input from 'src/components/input/Input'
import { motion } from 'framer-motion'
import { HiMiniPlus, HiOutlineMinusCircle } from 'react-icons/hi2'
import Button from 'src/components/button/Button'
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'

export interface ExaminationStepFormProps {
  title: string
  delta: number
  name: string
  control: Control<any>
  register: UseFormRegister<any>
  errors: any
}

export default function ExaminationStepForm({
  title,
  delta,
  control,
  name,
  register,
  errors
}: ExaminationStepFormProps) {
  const { append, remove, fields } = useFieldArray({
    control,
    name
  })
  const handleAddRow = () => {
    append({ parameter: '', index: '', unit: '' })
  }
  const handleRemoveRow = (index: number) => {
    remove(index)
  }
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='flex flex-1 flex-col gap-4'
    >
      <h3 className='font-bold'>{title}</h3>
      <div className='card flex-1 bg-bg_primary shadow'>
        <div className='card-body justify-between'>
          <div className='overflow-x-auto'>
            <table className='table'>
              <thead>
                <tr className='border-black/70'>
                  <th>Parameter</th>
                  <th>Index</th>
                  <th>Unit</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr className='hover relative border-black/20' key={field.id}>
                    <td>
                      <Input
                        register={register}
                        name={`${name}.${index}.parameter`}
                        placeholder={'Parameter'}
                        errorMessage={errors?.[name]?.[index]?.parameter?.message}
                      />
                    </td>
                    <td>
                      <Input
                        register={register}
                        name={`${name}.${index}.index`}
                        placeholder={'Index'}
                        errorMessage={errors?.[name]?.[index]?.index?.message}
                      />
                    </td>
                    <td>
                      <Input
                        register={register}
                        name={`${name}.${index}.unit`}
                        placeholder={'Unit'}
                        errorMessage={errors?.[name]?.[index]?.unit?.message}
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
          <Button
            title='Add parameters'
            Icon={HiMiniPlus}
            className='btn-primary w-max font-bold text-white'
            onClick={handleAddRow}
            type='button'
          />
        </div>
      </div>
    </motion.div>
  )
}
