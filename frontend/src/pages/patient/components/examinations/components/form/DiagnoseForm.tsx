import { motion } from 'framer-motion'
import { UseFormRegister } from 'react-hook-form'
import Input from 'src/components/input/Input'
export interface DiagnoseFormProps {
  delta: number
  register: UseFormRegister<any>
  errors: any
}

export default function DiagnoseForm({ delta, register, errors }: DiagnoseFormProps) {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='flex flex-1 flex-col gap-8'
    >
      <article className='flex flex-col gap-2'>
        <h3 className='text-xl font-bold'>Diagnose</h3>
        <div className='card flex-1 bg-bg_primary shadow'>
          <div className='card-body'>
            <div className='flex flex-col gap-1'>
              <h4 className='font-bold'>Conclude</h4>
              <Input
                register={register}
                name='diagnose.conclude'
                errorMessage={errors?.diagnose?.conclude?.message}
                placeholder='Conclude'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h4 className='font-bold'>Details</h4>
              <textarea
                rows={6}
                className='textarea w-full hover:border-primary focus:border-primary focus:outline-none'
                placeholder='Details'
                {...register('diagnose.details')}
              ></textarea>
              {errors?.diagnose?.details?.message && (
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors?.diagnose?.conclude?.message}</div>
              )}
            </div>
          </div>
        </div>
      </article>
      <article className='flex flex-col gap-2'>
        <h3 className='text-xl font-bold'>Note</h3>
        <div className='card flex-1 bg-bg_primary shadow'>
          <div className='card-body'>
            <textarea
              rows={6}
              className='textarea hover:border-primary focus:border-primary focus:outline-none'
              placeholder='Note'
              {...register('diagnose.advice')}
            ></textarea>
          </div>
        </div>
      </article>
    </motion.div>
  )
}
