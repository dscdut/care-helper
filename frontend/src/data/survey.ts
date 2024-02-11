import { AnswersSurvey } from 'src/types/survey.type'

export const questions = [
  {
    id: 1,
    content: 'Huyết áp của bạn hôm nay là bao nhiêu?'
  },
  {
    id: 2,
    content: 'Bạn đang sử dụng những loại thuốc nào?'
  },
  {
    id: 3,
    content: 'Tình trạng chung của sức khoẻ bạn như thế nào?'
  },
  {
    id: 4,
    content: 'Cảm giác và tâm trạng của bạn như thế nào?'
  },
  {
    id: 5,
    content: 'Bạn có thể mô tả cụ thể hơn hay không?'
  }
]

const answers = [
  '85/110',
  'Tôi đang sử dụng thuốc panadol extra, 1 ngày 1 viên',
  'Tốt',
  'Trong ngày hôm nay, tôi cảm thấy rất tốt. Tôi đã dành thời gian để chăm sóc bản thân và lắng nghe cơ thể mình. Tôi cảm thấy sức khỏe của mình đang tốt, không có dấu hiệu gì đáng lo ngại. Cảm ơn vì sự quan tâm của bác sĩ.',
  'Mỗi buổi sáng, khi ánh nắng len lỏi qua cửa sổ, tôi tỉnh dậy với niềm hân hoan của một ngày mới đầy hứa hẹn. Mặc dù bệnh cao huyết áp đang hiện diện, nhưng tôi vẫn luôn lạc quan và tích cực. Tôi nhận ra rằng, dù có những thử thách, nhưng cuộc sống vẫn đáng để sống và tràn đầy cơ hội.\nMỗi ngày, khi tôi bước ra khỏi cánh cửa, tôi tự tin và quyết tâm vượt qua mọi rào cản. Dù có cảm giác mệt mỏi và áp lực từ bệnh tình, nhưng tôi không bao giờ từ bỏ hy vọng và sự lạc quan. Tôi tìm thấy niềm vui và ý nghĩa trong những khoảnh khắc nhỏ bé của cuộc sống, từ những bữa ăn ngon lành đến những cuộc trò chuyện vui vẻ với gia đình và bạn bè.\nThậm chí, bệnh tình cũng đã trở thành động lực để tôi chăm sóc sức khỏe của mình hơn. Tôi học cách ăn uống lành mạnh, tập thể dục đều đặn và thực hiện các biện pháp giảm căng thẳng để giữ cho cơ thể và tâm hồn luôn trong trạng thái tốt nhất.\nMỗi lần đo huyết áp, dù con số có cao lên đi nữa, nhưng tôi vẫn nhìn nhận nó như một bước tiến trong việc quản lý sức khỏe của mình. Tôi tin rằng, với sự kiên nhẫn, quyết tâm và lòng lạc quan, tôi có thể vượt qua mọi thách thức và sống một cuộc sống đầy ý nghĩa và hạnh phúc.'
]

export const answersSurvey: AnswersSurvey[] = Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index,
    question: questions[index].content,
    answer: answers[index]
  }))
