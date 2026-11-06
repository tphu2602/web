import React, { useState } from 'react';

const initialSubjects = [
  {
    id: 1,
    name: "Lập trình Hướng đối tượng (OOP)",
    entries: [
      {
        id: 101,
        date: "06/11/2026",
        title: "Tính đóng gói trong OOP (Encapsulation)",
        content: `✦ 1. Tổng quan trọng tâm:
Tính đóng gói là một trong bốn trụ cột cơ bản của Lập trình Hướng đối tượng (OOP). Nó đóng vai trò như một lớp áo giáp bảo vệ dữ liệu bên trong đối tượng khỏi những tác động thay đổi bất hợp pháp từ bên ngoài.

✦ 2. Bản chất chi tiết & Cách hoạt động:
- Trong thực tế, giống như một viên thuốc con nhộng che giấu các thành phần dược liệu bên trong, trong lập trình, các thuộc tính (dữ liệu) của class sẽ được khai báo ở chế độ riêng tư (private).
- Để bên ngoài có thể tương tác hoặc thay đổi dữ liệu đó một cách có kiểm soát, lập trình viên phải thông qua các phương thức công khai (public methods) được gọi là Getter (để lấy giá trị) và Setter (để gán/kiểm tra giá trị hợp lệ trước khi lưu).

✦ 3. Ví dụ minh họa thực tế:
Hãy tưởng tượng tài khoản ngân hàng của cậu. Số dư tài khoản là dữ liệu cực kỳ nhạy cảm, không ai được phép tự ý gán số dư thành 10 tỷ đồng từ bên ngoài. Thay vào đó, hệ thống bắt buộc phải thông qua hàm nạp/rút tiền (Setter) để kiểm tra xem tài khoản có đủ số dư hay không rồi mới cho phép thay đổi.

✦ 4. Lưu ý quan trọng khi ôn thi:
- Luôn nhớ từ khóa truy cập: private (cho dữ liệu) và public (cho getter/setter).
- Giúp mã nguồn có tính bảo mật cao, dễ dàng thay đổi cấu trúc bên trong mà không làm ảnh hưởng đến các đoạn code ở bên ngoài.`
      }
    ]
  }
];

const generateAITeachingContent = (title) => {
  const t = title.trim();
  if (!t) return "";

  return `✦ 1. Tổng quan trọng tâm về "${t}":
Đây là một chủ đề nền tảng và cốt lõi trong chương trình học. Việc nắm vững khái niệm này giúp cậu xây dựng tư duy logic chuẩn xác để giải quyết các bài tập trên lớp cũng như các bài toán thực tế sau này.

✦ 2. Bản chất chi tiết & Cơ chế hoạt động:
- Định nghĩa rõ ràng: ${t} bản chất là sự kết hợp giữa các thành phần lý thuyết cơ bản và các quy tắc vận hành logic.
- Cách tiếp cận: Để hiểu sâu, chúng ta cần phân tích cấu trúc thành phần bên trong, cách dữ liệu hoặc thông tin được truyền nhận và xử lý qua lại giữa các đối tượng hoặc module.
- Các bước triển khai chuẩn: Xác định bài toán cần giải quyết ➔ Thiết kế mô hình/thuật toán ➔ Viết mã nguồn kiểm chứng ➔ Tối ưu hóa hiệu suất.

✦ 3. Ví dụ minh họa thực tế dễ hiểu:
Hãy hình dung ${t} giống như cách chúng ta giải quyết một tình huống quen thuộc hằng ngày: chia nhỏ vấn đề lớn thành các bước xử lý đơn giản, tuần tự và có kiểm soát. Sự rõ ràng trong tư duy giúp hệ thống vận hành trơn tru và không xảy ra lỗi logic.

✦ 4. Lời khuyên ôn tập và học tập:
- Đừng chỉ học vẹt lý thuyết, hãy tự viết lại định nghĩa bằng ngôn ngữ của chính mình.
- Kết hợp tra cứu tài liệu Google và xem các video trực quan trên YouTube ở phần liên kết bên dưới để củng cố kiến thức một cách trực quan nhất nhé!`;
};

export default function StudyDiary() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  // Form state cho bài học
  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);

  // Mở rộng/thu gọn bài học
  const [expandedEntries, setExpandedEntries] = useState({ 101: true });

  // Thêm môn học mới
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newSub = {
      id: Date.now(),
      name: newSubjectName.trim(),
      entries: []
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName("");
  };

  // Xóa môn học
  const handleDeleteSubject = (subjectId) => {
    if (!window.confirm("Cậu có chắc chắn muốn xóa môn học này cùng toàn bộ bài học bên trong không?")) return;
    setSubjects(subjects.filter(sub => sub.id !== subjectId));
  };

  // Tự động sinh nội dung khi gõ tiêu đề
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setNewTitle(val);
    if (!editingEntryId && val.trim().length > 2) {
      setNewContent(generateAITeachingContent(val));
    } else if (!editingEntryId) {
      setNewContent("");
    }
  };

  // Mở form thêm bài học
  const openAddForm = (subjectId) => {
    setActiveSubjectId(activeSubjectId === subjectId ? null : subjectId);
    setEditingEntryId(null);
    setNewDate("");
    setNewTitle("");
    setNewContent("");
  };

  // Mở form sửa bài học
  const handleStartEdit = (entry, subjectId) => {
    setActiveSubjectId(subjectId);
    setEditingEntryId(entry.id);
    setNewDate(entry.date);
    setNewTitle(entry.title);
    setNewContent(entry.content);
  };

  // Lưu bài học (Thêm mới hoặc Cập nhật)
  const handleSaveEntry = (e, subjectId) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSubjects(subjects.map(sub => {
      if (sub.id === subjectId) {
        if (editingEntryId) {
          const updatedEntries = sub.entries.map(ent => 
            ent.id === editingEntryId 
              ? { ...ent, date: newDate.trim() || ent.date, title: newTitle.trim(), content: newContent.trim() }
              : ent
          );
          return { ...sub, entries: updatedEntries };
        } else {
          const newEntryId = Date.now();
          const newEntry = {
            id: newEntryId,
            date: newDate.trim() || new Date().toLocaleDateString("vi-VN"),
            title: newTitle.trim(),
            content: newContent.trim() || generateAITeachingContent(newTitle)
          };
          setExpandedEntries(prev => ({ ...prev, [newEntryId]: true }));
          return { ...sub, entries: [newEntry, ...sub.entries] };
        }
      }
      return sub;
    }));

    setNewTitle("");
    setNewContent("");
    setNewDate("");
    setEditingEntryId(null);
    setActiveSubjectId(null);
  };

  // Xóa bài học
  const handleDeleteEntry = (entryKey, subjectId) => {
    if (!window.confirm("Cậu có chắc chắn muốn xóa bài học này không?")) return;

    setSubjects(subjects.map(sub => {
      if (sub.id === subjectId) {
        return {
          ...sub,
          entries: sub.entries.filter(ent => ent.id !== entryKey)
        };
      }
      return sub;
    }));
  };

  const toggleExpand = (entryId) => {
    setExpandedEntries(prev => ({
      ...prev,
      [entryId]: !prev[entryId]
    }));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Nhật ký Học tập</h1>
        <p style={styles.headerSubtitle}>Trợ lý ghi chép kiến thức chi tiết và trực quan</p>

        <form onSubmit={handleAddSubject} style={styles.inlineForm}>
          <input 
            type="text"
            placeholder="Thêm môn học mới (ví dụ: Cơ sở dữ liệu)..."
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.buttonPrimary}>Thêm môn học</button>
        </form>
      </header>

      <div style={styles.subjectsGrid}>
        {subjects.map((sub) => {
          const isAddingOrEditing = activeSubjectId === sub.id;

          return (
            <div key={sub.id} style={styles.subjectCard}>
              <div style={styles.subjectHeader}>
                <h2 style={styles.subjectTitle}>{sub.name}</h2>
                <div style={styles.subjectHeaderActions}>
                  <button 
                    onClick={() => openAddForm(sub.id)}
                    style={styles.buttonSecondary}
                  >
                    {isAddingOrEditing ? "Đóng" : "+ Thêm bài học"}
                  </button>
                  <button 
                    onClick={() => handleDeleteSubject(sub.id)}
                    style={styles.deleteSubjectBtn}
                    title="Xóa môn học này"
                  >
                    Xóa môn
                  </button>
                </div>
              </div>

              {/* Form Thêm hoặc Sửa bài học */}
              {isAddingOrEditing && (
                <form onSubmit={(e) => handleSaveEntry(e, sub.id)} style={styles.entryForm}>
                  <h3 style={styles.formTitle}>
                    {editingEntryId ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
                  </h3>
                  <input 
                    type="text"
                    placeholder="Ngày (ví dụ: 07/11/2026)"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    style={styles.input}
                  />
                  <input 
                    type="text"
                    placeholder="Nhập tiêu đề bài học..."
                    value={newTitle}
                    onChange={handleTitleChange}
                    style={styles.input}
                  />
                  <textarea 
                    placeholder="Nội dung bài giảng..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    style={styles.textarea}
                  />
                  <div style={styles.formActions}>
                    <button 
                      type="button" 
                      onClick={() => { setActiveSubjectId(null); setEditingEntryId(null); }}
                      style={styles.buttonCancel}
                    >
                      Hủy
                    </button>
                    <button type="submit" style={styles.buttonPrimary}>
                      {editingEntryId ? "Cập nhật" : "Lưu bài học"}
                    </button>
                  </div>
                </form>
              )}

              <div style={styles.entriesList}>
                {sub.entries.length === 0 ? (
                  <p style={styles.emptyText}>Chưa có bài học nào trong môn này.</p>
                ) : (
                  sub.entries.map((entry) => {
                    const isExpanded = !!expandedEntries[entry.id];
                    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(entry.title)}`;
                    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(entry.title)}`;

                    return (
                      <div key={entry.id} style={styles.entryItem}>
                        <div style={styles.entryTopRow}>
                          <span style={styles.dateText}>{entry.date}</span>
                          <div style={styles.entryActions}>
                            <button onClick={() => toggleExpand(entry.id)} style={styles.textBtn}>
                              {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                            </button>
                            <span style={styles.dotSeparator}>·</span>
                            <button onClick={() => handleStartEdit(entry, sub.id)} style={styles.textBtn}>
                              Sửa
                            </button>
                            <span style={styles.dotSeparator}>·</span>
                            <button onClick={() => handleDeleteEntry(entry.id, sub.id)} style={styles.deleteBtn}>
                              Xóa
                            </button>
                          </div>
                        </div>

                        <h3 style={styles.entryTitle}>{entry.title}</h3>

                        {isExpanded && (
                          <div style={styles.expandedContentContainer}>
                            <p style={styles.entryContent}>{entry.content}</p>

                            <div style={styles.linksSection}>
                              <span style={styles.linksLabel}>Tài liệu & Video học tập:</span>
                              <div style={styles.linksRow}>
                                <a 
                                  href={googleSearchUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  style={styles.linkAnchor}
                                >
                                  Tìm tài liệu Google
                                </a>
                                <span style={styles.dot}>·</span>
                                <a 
                                  href={youtubeSearchUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  style={styles.linkAnchor}
                                >
                                  Xem video YouTube
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#F7F7F5',
    minHeight: '100vh',
    color: '#37352F',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: '700',
    margin: 0
  },
  headerSubtitle: {
    color: '#787774',
    fontSize: '15px',
    margin: '8px 0 20px 0'
  },
  inlineForm: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    maxWidth: '550px',
    margin: '0 auto'
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #E1E1DF',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #E1E1DF',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    minHeight: '150px',
    outline: 'none',
    resize: 'vertical',
    lineHeight: '1.6'
  },
  buttonPrimary: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#222222',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  buttonSecondary: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #E1E1DF',
    backgroundColor: '#FFFFFF',
    color: '#37352F',
    fontSize: '13px',
    cursor: 'pointer'
  },
  deleteSubjectBtn: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #F8D7DA',
    backgroundColor: '#FFF5F5',
    color: '#D93025',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  buttonCancel: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #E1E1DF',
    backgroundColor: '#FFFFFF',
    color: '#555555',
    fontSize: '14px',
    cursor: 'pointer'
  },
  subjectsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E1E1DF',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
  },
  subjectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #EFEFEE',
    paddingBottom: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  subjectHeaderActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  subjectTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
    color: '#111111'
  },
  entryForm: {
    backgroundColor: '#FAFAFA',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #EFEFEE',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#333333'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px'
  },
  entriesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  emptyText: {
    color: '#888888',
    fontSize: '14px',
    fontStyle: 'italic',
    margin: 0
  },
  entryItem: {
    backgroundColor: '#FAFAFA',
    borderRadius: '8px',
    padding: '18px',
    border: '1px solid #EFEFEE'
  },
  entryTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  dateText: {
    fontSize: '12px',
    backgroundColor: '#F1F1EF',
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#555555'
  },
  entryActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  textBtn: {
    background: 'none',
    border: 'none',
    color: '#0066CC',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#D93025',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0
  },
  dotSeparator: {
    color: '#CCCCCC',
    fontSize: '12px'
  },
  entryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 10px 0',
    color: '#222222'
  },
  expandedContentContainer: {
    borderTop: '1px solid #EFEFEE',
    paddingTop: '12px',
    marginTop: '4px'
  },
  entryContent: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#37352F',
    margin: '0 0 14px 0',
    whiteSpace: 'pre-line'
  },
  linksSection: {
    borderTop: '1px solid #EFEFEE',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  linksLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#787774',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  linksRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px'
  },
  linkAnchor: {
    color: '#0066CC',
    textDecoration: 'none',
    fontWeight: '500'
  },
  dot: {
    color: '#999999'
  }
};