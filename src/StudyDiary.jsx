import React, { useState } from 'react';

const mockData = [
  {
    id: 1,
    date: "06/11/2026",
    subject: "Lập trình Hướng đối tượng (OOP)",
    title: "Tính đóng gói trong OOP (Encapsulation)",
    content: "Tính đóng gói là một trong 4 tính chất cơ bản của OOP (cùng với Kế thừa, Đa hình, Trừu tượng). Mục đích chính: - Che giấu chi tiết cài đặt bên trong (trạng thái, dữ liệu) của đối tượng. - Bảo vệ dữ liệu khỏi việc bị thay đổi tùy tiện từ bên ngoài. - Yêu cầu mọi tương tác phải thông qua các phương thức công khai (getter/setter). Trong ngôn ngữ Java/C++: Ta sử dụng Access Modifiers như private, protected, public để kiểm soát mức độ truy cập các thuộc tính và phương thức.",
    links: [
      { type: "video", title: "Video: Giải thích Encapsulation bằng Java dễ hiểu", url: "" },
      { type: "doc", title: "Tài liệu: Lập trình OOP - ĐHQG TP.HCM", url: "" }
    ]
  },
  {
    id: 2,
    date: "04/11/2026",
    subject: "Cấu trúc dữ liệu và Giải thuật",
    title: "Cây nhị phân tìm kiếm (Binary Search Tree)",
    content: "Cây nhị phân tìm kiếm (BST) là một cấu trúc dữ liệu dạng cây, trong đó: - Mỗi node có tối đa 2 node con (trái và phải). - Giá trị của mọi node thuộc cây con bên trái luôn NHỎ HƠN giá trị node hiện tại. - Giá trị của mọi node thuộc cây con bên phải luôn LỚN HƠN giá trị node hiện tại. Độ phức tạp thời gian: - Tìm kiếm, chèn, xóa trung bình: O(log n) - Trường hợp xấu nhất (cây bị lệch): O(n)",
    links: [
      { type: "video", title: "Video: Trực quan hóa cách chèn/xóa Node trong BST", url: "" },
      { type: "doc", title: "Giáo trình CTDL - GeeksforGeeks", url: "" }
    ]
  }
];

export default function StudyDiary() {
  const [expandedId, setExpandedId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockData.filter(item => 
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Nhật ký Học tập</h1>
        <p style={styles.headerSubtitle}>Ghi lại hành trình tri thức mỗi ngày</p>
        <input 
          type="text" 
          placeholder="Tìm kiếm theo môn học hoặc chủ đề..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </header>

      <div style={styles.timeline}>
        {filteredData.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <div key={item.id} style={styles.card}>
              <div 
                style={styles.cardHeader} 
                onClick={() => setExpandedId(isOpen ? null : item.id)}
              >
                <div style={styles.cardMeta}>
                  <span style={styles.dateBadge}>{item.date}</span>
                  <span style={styles.subjectBadge}>{item.subject}</span>
                </div>
                <div style={styles.cardTitleRow}>
                  <h2 style={styles.cardTitle}>{item.title}</h2>
                  <span style={{ fontSize: '12px', color: '#787774' }}>
                    {isOpen ? 'Thu gọn' : 'Chi tiết'}
                  </span>
                </div>
              </div>

              {isOpen && (
                <div style={styles.cardBody}>
                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Ghi chú bài học</h3>
                    <p style={styles.contentParagraph}>{item.content}</p>
                  </div>

                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Tài liệu tham khảo & Video</h3>
                    <ul style={styles.linkList}>
                      {item.links.map((link, idx) => {
                        const targetUrl = link.url && link.url.trim() !== "" && link.url !== "#"
                          ? link.url
                          : `https://www.google.com/search?q=${encodeURIComponent(link.title)}`;

                        return (
                          <li key={idx} style={styles.linkItem}>
                            <a 
                              href={targetUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                             onClick={(e) => {
                              e.stopPropagation();
                            }}
                              style={styles.linkAnchor}
                            >
                              {link.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#F7F7F5',
    minHeight: '100vh',
    color: '#37352F'
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 8px 0'
  },
  headerSubtitle: {
    color: '#787774',
    fontSize: '15px',
    margin: '0 0 20px 0'
  },
  searchInput: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #E1E1DF',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    outline: 'none',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E1E1DF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    transition: 'all 0.2s ease'
  },
  cardHeader: {
    padding: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #EFEFEE'
  },
  cardMeta: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px',
    fontSize: '12px'
  },
  dateBadge: {
    backgroundColor: '#F1F1EF',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#37352F',
    fontWeight: '500'
  },
  subjectBadge: {
    backgroundColor: '#E6F4EA',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#137333',
    fontWeight: '500'
  },
  cardTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0',
    color: '#222222'
  },
  cardBody: {
    padding: '20px',
    backgroundColor: '#FFFFFF'
  },
  section: {
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#787774',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  },
  contentParagraph: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#37352F',
    margin: '0',
    whiteSpace: 'pre-line'
  },
  linkList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px'
  },
  linkAnchor: {
    color: '#0066CC',
    textDecoration: 'none',
    fontWeight: '500'
  }
};