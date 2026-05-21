const resources = [
  { id: '1', title: 'TP. Hà Nội - 3 đoàn' },
  { id: '2', title: 'TP. Hồ Chí Minh - 3 đoàn' },
  { id: '3', title: 'Ninh Bình - 3 đoàn' },
  { id: '4', title: 'Nghệ An - 3 đoàn' },
  { id: '5', title: 'Đà Nẵng - 2 đoàn' },
  { id: '6', title: 'Hải Phòng - 1 đoàn' },
  { id: '7', title: 'Cần Thơ - 2 đoàn' },
  { id: '8', title: 'Thừa Thiên Huế - 1 đoàn' },
  { id: '9', title: 'Quảng Ninh - 2 đoàn' },
  { id: '10', title: 'Khánh Hòa - 1 đoàn' },
  { id: '11', title: 'Lâm Đồng - 2 đoàn' },
  { id: '12', title: 'Bà Rịa - Vũng Tàu - 1 đoàn' }
];

const events = [
  {
    id: 'e1', resourceId: '1', start: '2026-03-01', end: '2026-10-03',
    title: 'QH1 - Đoàn công tác số 1 về việc thực hiện Nghị quyết số 43/2022/QH15 của Quốc hội về chính sách tài khóa, tiền tệ hỗ trợ Chương trình phục hồi và phát triển kinh tế - xã hội',
    className: ['event-yellow'],
    description: 'Đoàn giám sát tối cao của Quốc hội sẽ tập trung vào việc đánh giá kết quả đạt được, những hạn chế, khó khăn, vướng mắc và nguyên nhân trong việc triển khai thực hiện các chính sách tài khóa, tiền tệ hỗ trợ Chương trình phục hồi.'
  },
  {
    id: 'e2', resourceId: '1', start: '2026-01-20', end: '2026-09-04',
    title: 'UBTVQH1 - Đoàn công tác số 2 về việc thực hiện chính sách, pháp luật về phát triển năng lượng giai đoạn 2016-2021',
    className: ['event-pink'],
    description: 'Nội dung giám sát bao gồm việc thực hiện quy hoạch phát triển điện lực quốc gia, quy hoạch tổng thể về năng lượng quốc gia and các chính sách hỗ trợ phát triển năng lượng tái tạo tại các địa phương trọng điểm.'
  },
  {
    id: 'e3', resourceId: '1', start: '2026-01-29', end: '2026-01-31',
    title: 'UBTVQH2 - Đoàn công tác kiểm tra thực tế việc thực hiện đổi mới chương trình, sách giáo khoa giáo dục phổ thông',
    className: ['event-yellow'],
    description: 'Kiểm tra tình hình chuẩn bị đội ngũ giáo viên, cơ sở vật chất, thiết bị dạy học and việc in ấn, phát hành sách giáo khoa tại các cơ sở giáo dục trên địa bàn thành phố.'
  },
  {
    id: 'e4', resourceId: '3', start: '2026-03-03', end: '2026-10-03',
    title: 'QH1 - Đoàn công tác số 1 về giám sát chuyên đề việc thực hiện chính sách, pháp luật về quản lý thị trường bất động sản and phát triển nhà ở xã hội',
    className: ['event-yellow'],
    description: 'Đánh giá thực trạng việc thực hiện các dự án đầu tư xây dựng nhà ở xã hội, những bất cập trong quy định pháp luật hiện hành and đề xuất giải pháp tháo gỡ khó khăn cho thị trường bất động sản.'
  },
  {
    id: 'e5', resourceId: '3', start: '2026-03-20', end: '2026-04-05',
    title: 'UBTVQH2 - Đoàn công tác làm việc với Ủy ban nhân dân tỉnh về tình hình phát triển kinh tế xã hội and dự toán ngân sách nhà nước',
    className: ['event-yellow'],
    description: 'Báo cáo tình hình thực hiện các chỉ tiêu kinh tế xã hội năm 2025, phương hướng nhiệm vụ năm 2026 and các kiến nghị của địa phương đối với Trung ương về cơ chế chính sách đặc thù.'
  },
  {
    id: 'ee5', resourceId: '3', start: '2026-03-20', end: '2026-04-05',
    title: 'UBTVQH2 - Đoàn công tác làm việc với Ủy ban nhân dân tỉnh về tình hình phát triển kinh tế xã hội and dự toán ngân sách nhà nước',
    className: ['event-yellow'],
    description: 'Báo cáo tình hình thực hiện các chỉ tiêu kinh tế xã hội năm 2025, phương hướng nhiệm vụ năm 2026 and các kiến nghị của địa phương đối với Trung ương về cơ chế chính sách đặc thù.'
  },
  {
    id: 'eee5', resourceId: '3', start: '2026-03-20', end: '2026-04-05',
    title: 'UBTVQH2 - Đoàn công tác làm việc với Ủy ban nhân dân tỉnh về tình hình phát triển kinh tế xã hội and dự toán ngân sách nhà nước',
    className: ['event-yellow'],
    description: 'Báo cáo tình hình thực hiện các chỉ tiêu kinh tế xã hội năm 2025, phương hướng nhiệm vụ năm 2026 and các kiến nghị của địa phương đối với Trung ương về cơ chế chính sách đặc thù.'
  },
  {
    id: 'e6', resourceId: '3', start: '2026-03-12', end: '2026-03-15',
    title: 'UBTVQH2 - Đoàn công tác giám sát tình hình thực hiện dự án đường cao tốc Bắc - Nam phía Đông',
    className: ['event-yellow'],
    description: 'Kiểm tra tiến độ giải phóng mặt bằng, thi công xây lắp and giải ngân vốn đầu tư công tại các gói thầu đi qua địa bàn tỉnh.'
  },
  {
    id: 'e7', resourceId: '3', start: '2026-06-10', end: '2026-11-20',
    title: 'QH2 - Đoàn công tác số 1 về việc thực hiện chính sách pháp luật về bảo vệ môi trường tại các khu công nghiệp',
    className: ['event-yellow'],
    description: 'Giám sát việc vận hành hệ thống xử lý nước thải tập trung and công tác quản lý chất thải nguy hại của các doanh nghiệp.'
  },
  {
    id: 'e8', resourceId: '2', start: '2026-02-15', end: '2026-08-30',
    title: 'QH1 - Đoàn công tác số 3 về việc thực hiện Nghị quyết của Quốc hội về thí điểm cơ chế, chính sách đặc thù phát triển Thành phố',
    className: ['event-orange'],
    description: 'Đánh giá tác động của các chính sách đặc thù đối với sự phát triển kinh tế xã hội and thu ngân sách của Thành phố.'
  },
  {
    id: 'e9', resourceId: '2', start: '2026-04-01', end: '2026-04-10',
    title: 'UBTVQH1 - Đoàn công tác khảo sát việc thực hiện chính sách đối với người có công with cách mạng',
    className: ['event-pink'],
    description: 'Thăm and làm việc with các trung tâm nuôi dưỡng người có công, kiểm tra việc chi trả trợ cấp and các chế độ ưu đãi khác.'
  },
  {
    id: 'e10', resourceId: '2', start: '2026-09-15', end: '2026-12-01',
    title: 'QH2 - Đoàn giám sát chuyên đề về công tác quản lý, sử dụng tài sản công tại các đơn vị sự nghiệp',
    className: ['event-yellow'],
    description: 'Rà soát việc sắp xếp lại, xử lý nhà đất thuộc sở hữu nhà nước and việc quản lý nguồn thu từ việc khai thác tài sản công.'
  },
  {
    id: 'e11', resourceId: '4', start: '2026-01-10', end: '2026-05-20',
    title: 'QH1 - Đoàn công tác về thực hiện chương trình mục tiêu quốc gia xây dựng nông thôn mới giai đoạn 2021-2025',
    className: ['event-orange'],
    description: 'Kiểm tra kết quả thực hiện các tiêu chí nông thôn mới nâng cao, nông thôn mới kiểu mẫu tại các huyện, xã vùng sâu vùng xa.'
  },
  {
    id: 'e12', resourceId: '4', start: '2026-03-01', end: '2026-03-05',
    title: 'UBTVQH2 - Đoàn công tác khảo sát tình hình thực hiện chính sách, pháp luật về dân tộc, tôn giáo',
    className: ['event-pink'],
    description: 'Gặp gỡ những người có uy tín trong cộng đồng các dân tộc thiểu số and đại diện các tổ chức tôn giáo trên địa bàn.'
  },
  {
    id: 'e13', resourceId: '4', start: '2026-08-20', end: '2026-10-15',
    title: 'QH2 - Đoàn công tác số 2 về giám sát việc thực hiện chính sách hỗ trợ phát triển vùng đồng bào dân tộc thiểu số and miền núi',
    className: ['event-yellow'],
    description: 'Đánh giá hiệu quả của các dự án đầu tư hạ tầng, hỗ trợ sản xuất and các chính sách an sinh xã hội dành cho đồng bào.'
  }
];
