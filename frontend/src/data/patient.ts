import { SurveyStatus } from 'src/types/survey.type'
import { PatientAdministrative, PatientRecord, PatientType } from 'src/types/users.type'

export const patients: PatientType[] = Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: 'Bitcoin ' + index,
    date: '17/01/2010',
    phone: '75675643',
    doctor: 'Bitcoin Doctor',
    diagnose: 'Huyet ap',
    survey: {
      id: index,
      status: index % 2 ? SurveyStatus.FINISHED : SurveyStatus.WAITING,
      date: '03/09/2010',
      diagnose: 'Sample diagnosis 1'
    }
  }))

export const patientRecords: PatientRecord[] = Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index,
    date: '17/01/2010',
    doctor: 'Bitcoin Doctor ' + index
  }))

export const patientAdministrative: PatientAdministrative = {
  information: {
    left: [
      {
        title: 'Họ và tên',
        value: 'Nguyễn Văn A'
      },
      {
        title: 'Ngày tháng năm sinh',
        value: '25/12/1997'
      },
      {
        title: 'Giới tính',
        value: 'Nam'
      },
      {
        title: 'Căn cước công dân',
        value: '201853583'
      }
    ],
    right: [
      {
        title: 'Địa chỉ thường trú',
        value: '54 Nguyễn Lương Bằng, quận Liên Chiểu, thành phố Đà Nẵng'
      },
      {
        title: 'Nghề nghiệp',
        value: 'Kinh doanh'
      }
    ]
  },
  reasonForHospitalization: 'Đau đầu, chóng mặt, buồn nôn',
  healthInsurance: {
    data: ['DN', '4', '79', '7917131400'],
    object: ' Thu phí'
  },
  healthOverview: [
    {
      title: 'Chiều cao',
      value: '178cm'
    },
    {
      title: 'Cân nặng',
      value: '48kg'
    }
  ]
}
