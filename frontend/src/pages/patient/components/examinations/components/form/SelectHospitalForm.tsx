import { UseFormRegister } from 'react-hook-form'
import Select from 'src/components/select/Select'
import { HospitalListName } from 'src/types/hospitals.type'
import { motion } from 'framer-motion'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'

export interface SelectHospitalFormProps {
  delta: number
  register: UseFormRegister<any>
  errorMessage: string
  hospitalsListNameData: HospitalListName[]
}

export default function SelectHospitalForm({
  register,
  delta,
  errorMessage,
  hospitalsListNameData
}: SelectHospitalFormProps) {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='flex flex-1 flex-col gap-4'
    >
      <h3 className='font-bold'>Add New Examination</h3>
      <div className='card flex-1 bg-bg_primary shadow'>
        <div className='card-body h-full flex-row items-center'>
          <div className='flex w-full flex-col gap-4 lg:flex-row'>
            <div className='flex flex-1 flex-col justify-center gap-4'>
              <h4 className='font-bold'>Choose a hospital</h4>
              <Select
                register={register}
                name='hospital'
                options={
                  hospitalsListNameData?.map((hospital) => ({
                    value: hospital.id,
                    label: hospital.name
                  })) || []
                }
                errorMessage={errorMessage}
              />
            </div>
            <div className='divider lg:divider-horizontal'>OR</div>
            <div className='flex flex-1 flex-col justify-center gap-4'>
              <h4 className='font-bold'>Upload medical record file</h4>
              <label
                htmlFor='uploadFile1'
                className='flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white px-4 py-4 text-center'
              >
                <HiOutlineCloudArrowUp className='h-14 w-14 text-primary' />
                <p className='text-sm font-semibold'>
                  Drag &amp; Drop or <span className='text-primary'>Choose file</span> to upload
                </p>
                <input type='file' id='uploadFile1' className='hidden' />
                <p className='mt-2 text-xs'>PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
