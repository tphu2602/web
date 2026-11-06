import React, { useState, useEffect } from 'react';

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
- Để bên ngoài có thể tương tác hoặc thay đổi dữ liệu đó một cách có kiểm soát, lập trình viên phải thông qua các phương thức công khai (public methods) được gọi là Getter (để lấy giá trị) và Setter (để gán/kiểm tra giá trị hợp lệ trước khi lưu).`
      }
    ]
  }
];

const initialTimetable = [
  { id: 1, day: "Thứ Hai", time: "07:00 - 11:15", subject: "Lập trình Hướng đối tượng (OOP)", room: "Phòng thực hành A2.1" },
  { id: 2, day: "Thứ Tư", time: "13:30 - 17:00", subject: "Cấu trúc dữ liệu và Giải thuật", room: "Phòng lý thuyết B3.4" },
];

const generateAITeachingContent = (title) => {
  const t = title.trim();
  if (!t) return "";

  return `✦ 1. Tổng quan trọng tâm về "${t}":
Đây là một chủ đề nền tảng và cốt lõi trong chương trình học. Việc nắm vững khái niệm này giúp cậu xây dựng tư duy logic chuẩn xác để giải quyết các bài tập trên lớp cũng như các bài toán thực tế sau này.

✦ 2. Bản chất chi tiết & Cơ chế hoạt động:
- Định nghĩa rõ ràng: ${t} bản chất là sự kết hợp giữa các thành phần lý thuyết cơ bản và các quy tắc vận hành logic.
- Các bước triển khai chuẩn: Xác định bài toán cần giải quyết ➔ Thiết kế mô hình/thuật toán ➔ Viết mã nguồn kiểm chứng ➔ Tối ưu hóa hiệu suất.

✦ 3. Ví dụ minh họa thực tế dễ hiểu:
Hãy hình dung ${t} giống như cách chúng ta giải quyết một tình huống quen thuộc hằng ngày: chia nhỏ vấn đề lớn thành các bước xử lý đơn giản, tuần tự và có kiểm soát.

✦ 4. Lời khuyên ôn tập:
- Đừng chỉ học vẹt lý thuyết, hãy tự viết lại định nghĩa bằng ngôn ngữ của chính mình và kết hợp xem video hướng dẫn bên dưới nhé!`;
};

// Danh sách các bảng màu cá nhân hóa để cậu lựa chọn
const themes = [
  { name: "Cổ điển (Dark)", primary: "#1A202C", indicator: "#3182CE", bg: "#F8F9FA" },
  { name: "Xanh dương (Blue)", primary: "#0066CC", indicator: "#0052A3", bg: "#F0F5FF" },
  { name: "Tím nghiên cứu (Purple)", primary: "#6B46C1", indicator: "#805AD5", bg: "#FAF5FF" },
  { name: "Xanh lá mạ (Green)", primary: "#2F855A", indicator: "#38A169", bg: "#F0FFF4" },
  { name: "Cam năng động (Orange)", primary: "#C05621", indicator: "#DD6B20", bg: "#FFFAF0" },
];

export default function StudyDiary() {
  const [activeTab, setActiveTab] = useState("diary"); // "diary" hoặc "timetable"
  
  // Lưu màu chủ đề vào localStorage để giữ nguyên khi F5
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("study_diary_theme");
    return saved ? JSON.parse(saved) : themes[0];
  });

  useEffect(() => {
    localStorage.setItem("study_diary_theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  const [subjects, setSubjects] = useState(initialSubjects);
  const [timetable, setTimetable] = useState(initialTimetable);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  // Form bài học
  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [expandedEntries, setExpandedEntries] = useState({ 101: true });

  // Form Thời khóa biểu
  const [ttDay, setTtDay] = useState("Thứ Hai");
  const [ttTime, setTtTime] = useState("");
  const [ttSubject, setTtSubject] = useState("");
  const [ttRoom, setTtRoom] = useState("");

  // Thêm môn học
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newSub = { id: Date.now(), name: newSubjectName.trim(), entries: [] };
    setSubjects([...subjects, newSub]);
    setNewSubjectName("");
  };

  const handleDeleteSubject = (subjectId) => {
    if (!window.confirm("Cậu có chắc chắn muốn xóa môn học này không?")) return;
    setSubjects(subjects.filter(sub => sub.id !== subjectId));
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setNewTitle(val);
    if (!editingEntryId && val.trim().length > 2) {
      setNewContent(generateAITeachingContent(val));
    } else if (!editingEntryId) {
      setNewContent("");
    }
  };

  const openAddForm = (subjectId) => {
    setActiveSubjectId(activeSubjectId === subjectId ? null : subjectId);
    setEditingEntryId(null);
    setNewDate("");
    setNewTitle("");
    setNewContent("");
  };

  const handleStartEdit = (entry, subjectId) => {
    setActiveSubjectId(subjectId);
    setEditingEntryId(entry.id);
    setNewDate(entry.date);
    setNewTitle(entry.title);
    setNewContent(entry.content);
  };

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

  const handleDeleteEntry = (entryKey, subjectId) => {
    if (!window.confirm("Cậu có chắc muốn xóa bài học này?")) return;
    setSubjects(subjects.map(sub => {
      if (sub.id === subjectId) {
        return { ...sub, entries: sub.entries.filter(ent => ent.id !== entryKey) };
      }
      return sub;
    }));
  };

  const toggleExpand = (entryId) => {
    setExpandedEntries(prev => ({ ...prev, [entryId]: !prev[entryId] }));
  };

  // Thêm lịch học vào thời khóa biểu
  const handleAddTimetable = (e) => {
    e.preventDefault();
    if (!ttSubject.trim()) return;
    const newItem = {
      id: Date.now(),
      day: ttDay,
      time: ttTime.trim() || "07:00 - 09:15",
      subject: ttSubject.trim(),
      room: ttRoom.trim() || "Chưa cập nhật phòng"
    };
    setTimetable([...timetable, newItem]);
    setTtSubject("");
    setTtRoom("");
    setTtTime("");
  };

  const handleDeleteTimetable = (id) => {
    if (!window.confirm("Xóa lịch học này?")) return;
    setTimetable(timetable.filter(item => item.id !== id));
  };

  const filteredSubjects = subjects.map(sub => {
    if (!searchTerm.trim()) return sub;
    const filteredEntries = sub.entries.filter(ent => 
      ent.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ent.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...sub, entries: filteredEntries };
  }).filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.entries.length > 0);

  return (
    <div style={{ ...styles.container, backgroundColor: currentTheme.bg }}>
      <header style={styles.header}>
        {/* THANH CÁ NHÂN HÓA MÀU SẮC & CHUYỂN TAB */}
        <div style={styles.topBar}>
          <div style={styles.tabSwitchers}>
            <button 
              onClick={() => setActiveTab("diary")} 
              style={{ 
                ...styles.tabBtn, 
                backgroundColor: activeTab === "diary" ? currentTheme.primary : "#FFFFFF",
                color: activeTab === "diary" ? "#FFFFFF" : "#2D3748",
                borderColor: currentTheme.primary
              }}
            >
              📖 Nhật ký học tập
            </button>
            <button 
              onClick={() => setActiveTab("timetable")} 
              style={{ 
                ...styles.tabBtn, 
                backgroundColor: activeTab === "timetable" ? currentTheme.primary : "#FFFFFF",
                color: activeTab === "timetable" ? "#FFFFFF" : "#2D3748",
                borderColor: currentTheme.primary
              }}
            >
              📅 Thời khóa biểu
            </button>
          </div>

          {/* Chọn màu chủ đề */}
          <div style={styles.themePicker}>
            <span style={styles.themeLabel}>Màu chủ đề:</span>
            <div style={styles.themeColorsRow}>
              {themes.map((th, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTheme(th)}
                  style={{
                    ...styles.colorDot,
                    backgroundColor: th.primary,
                    border: currentTheme.primary === th.primary ? '2px solid #000' : '2px solid transparent'
                  }}
                  title={th.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={styles.headerBadge}>Workspace cá nhân</div>
        <h1 style={styles.headerTitle}>Nhật ký Học tập & Lịch trình</h1>
        <p style={styles.headerSubtitle}>Học đi nếu kh muốn rớt môn</p>

        {activeTab === "diary" && (
          <div style={styles.headerActions}>
            <form onSubmit={handleAddSubject} style={styles.inlineForm}>
              <input 
                type="text"
                placeholder="Thêm môn học mới (ví dụ: Cơ sở dữ liệu)..."
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={{ ...styles.buttonPrimary, backgroundColor: currentTheme.primary }}>
                Thêm môn học
              </button>
            </form>

            <input 
              type="text"
              placeholder="Tìm kiếm môn học hoặc nội dung bài học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        )}
      </header>

      {/* NỘI DUNG TAB 1: NHẬT KÝ HỌC TẬP */}
      {activeTab === "diary" && (
        <div style={styles.subjectsGrid}>
          {filteredSubjects.length === 0 ? (
            <div style={styles.emptySearchCard}>
              <p style={styles.emptyText}>Không tìm thấy môn học hoặc bài viết phù hợp.</p>
            </div>
          ) : (
            filteredSubjects.map((sub) => {
              const isAddingOrEditing = activeSubjectId === sub.id;

              return (
                <div key={sub.id} style={styles.subjectCard}>
                  <div style={styles.subjectHeader}>
                    <div style={styles.subjectTitleWrapper}>
                      <span style={{ ...styles.subjectIndicator, backgroundColor: currentTheme.indicator }}></span>
                      <h2 style={styles.subjectTitle}>{sub.name}</h2>
                    </div>
                    <div style={styles.subjectHeaderActions}>
                      <button 
                        onClick={() => openAddForm(sub.id)}
                        style={styles.buttonSecondary}
                      >
                        {isAddingOrEditing ? "Đóng form" : "+ Thêm bài học"}
                      </button>
                      <button 
                        onClick={() => handleDeleteSubject(sub.id)}
                        style={styles.deleteSubjectBtn}
                      >
                        Xóa môn
                      </button>
                    </div>
                  </div>

                  {isAddingOrEditing && (
                    <form onSubmit={(e) => handleSaveEntry(e, sub.id)} style={styles.entryForm}>
                      <h3 style={styles.formTitle}>
                        {editingEntryId ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
                      </h3>
                      <div style={styles.formRow}>
                        <input 
                          type="text"
                          placeholder="Ngày (ví dụ: 07/11/2026)"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          style={{ ...styles.input, flex: '0 0 180px' }}
                        />
                        <input 
                          type="text"
                          placeholder="Nhập tiêu đề bài học (AI tự động viết nội dung)..."
                          value={newTitle}
                          onChange={handleTitleChange}
                          style={{ ...styles.input, flex: 1 }}
                        />
                      </div>
                      <textarea 
                        placeholder="Nội dung bài giảng chi tiết..."
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
                        <button type="submit" style={{ ...styles.buttonPrimary, backgroundColor: currentTheme.primary }}>
                          {editingEntryId ? "Cập nhật" : "Lưu vào nhật ký"}
                        </button>
                      </div>
                    </form>
                  )}

                  <div style={styles.entriesList}>
                    {sub.entries.length === 0 ? (
                      <div style={styles.emptyBox}>
                        <p style={styles.emptyText}>Chưa có bài học nào trong môn này.</p>
                      </div>
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
                                <button onClick={() => toggleExpand(entry.id)} style={{ ...styles.textBtn, color: currentTheme.primary }}>
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
                                <div style={styles.contentBox}>
                                  <p style={styles.entryContent}>{entry.content}</p>
                                </div>

                                <div style={styles.linksSection}>
                                  <span style={styles.linksLabel}>Tài liệu tra cứu & Video học tập:</span>
                                  <div style={styles.linksRow}>
                                    <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer" style={{ ...styles.linkAnchor, color: currentTheme.primary }}>
                                      Tìm tài liệu Google ↗
                                    </a>
                                    <span style={styles.dot}>·</span>
                                    <a href={youtubeSearchUrl} target="_blank" rel="noopener noreferrer" style={{ ...styles.linkAnchor, color: currentTheme.primary }}>
                                      Xem video YouTube ↗
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
            })
          )}
        </div>
      )}

      {/* NỘI DUNG TAB 2: THỜI KHÓA BIỂU */}
      {activeTab === "timetable" && (
        <div style={styles.timetableContainer}>
          <div style={styles.subjectCard}>
            <h2 style={styles.subjectTitle}>Thêm lịch học mới</h2>
            <form onSubmit={handleAddTimetable} style={styles.ttForm}>
              <select 
                value={ttDay} 
                onChange={(e) => setTtDay(e.target.value)}
                style={styles.input}
              >
                {["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"].map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
              <input 
                type="text"
                placeholder="Giờ học (vd: 07:00 - 11:15)"
                value={ttTime}
                onChange={(e) => setTtTime(e.target.value)}
                style={styles.input}
              />
              <input 
                type="text"
                placeholder="Tên môn học..."
                value={ttSubject}
                onChange={(e) => setTtSubject(e.target.value)}
                style={styles.input}
              />
              <input 
                type="text"
                placeholder="Phòng học (vd: Phòng A2.1)"
                value={ttRoom}
                onChange={(e) => setTtRoom(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={{ ...styles.buttonPrimary, backgroundColor: currentTheme.primary }}>
                Thêm lịch học
              </button>
            </form>
          </div>

          <div style={styles.subjectCard}>
            <h2 style={styles.subjectTitle}>Lịch học trong tuần của cậu</h2>
            {timetable.length === 0 ? (
              <p style={styles.emptyText}>Chưa có lịch học nào được thêm.</p>
            ) : (
              <div style={styles.ttTableWrapper}>
                <table style={styles.ttTable}>
                  <thead>
                    <tr style={styles.ttTrHead}>
                      <th style={styles.ttTh}>Thứ</th>
                      <th style={styles.ttTh}>Thời gian</th>
                      <th style={styles.ttTh}>Môn học</th>
                      <th style={styles.ttTh}>Phòng học</th>
                      <th style={styles.ttTh}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map((item) => (
                      <tr key={item.id} style={styles.ttTr}>
                        <td style={styles.ttTd}><span style={styles.dateText}>{item.day}</span></td>
                        <td style={styles.ttTd}>{item.time}</td>
                        <td style={{ ...styles.ttTd, fontWeight: '600' }}>{item.subject}</td>
                        <td style={styles.ttTd}>{item.room}</td>
                        <td style={styles.ttTd}>
                          <button onClick={() => handleDeleteTimetable(item.id)} style={styles.deleteBtn}>
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '920px',
    margin: '0 auto',
    padding: '40px 24px',
    minHeight: '100vh',
    color: '#2D3748',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'background-color 0.3s ease'
  },
  header: {
    marginBottom: '36px',
    textAlign: 'center'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '14px'
  },
  tabSwitchers: {
    display: 'flex',
    gap: '10px'
  },
  tabBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  themePicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid #E2E8F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
  },
  themeLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#4A5568'
  },
  themeColorsRow: {
    display: 'flex',
    gap: '6px'
  },
  colorDot: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    cursor: 'pointer',
    outline: 'none'
  },
  headerBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#EDF2F7',
    color: '#4A5568',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '20px',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: '800',
    margin: '0 0 6px 0',
    color: '#1A202C'
  },
  headerSubtitle: {
    color: '#718096',
    fontSize: '15px',
    margin: '0 0 20px 0'
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  inlineForm: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    outline: 'none',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    minHeight: '160px',
    outline: 'none',
    resize: 'vertical',
    lineHeight: '1.6'
  },
  buttonPrimary: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  buttonSecondary: {
    padding: '8px 14px',
    borderRadius: '6px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    color: '#2D3748',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  deleteSubjectBtn: {
    padding: '8px 14px',
    borderRadius: '6px',
    border: '1px solid #FED7D7',
    backgroundColor: '#FFF5F5',
    color: '#E53E3E',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  buttonCancel: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    color: '#718096',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  subjectsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px'
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    padding: '28px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
  },
  subjectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #F7FAFC',
    paddingBottom: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  subjectTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  subjectIndicator: {
    width: '8px',
    height: '24px',
    borderRadius: '4px'
  },
  subjectHeaderActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  subjectTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#1A202C'
  },
  entryForm: {
    backgroundColor: '#F8F9FA',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '24px'
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#2D3748'
  },
  formRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '4px'
  },
  entriesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  emptyBox: {
    padding: '24px',
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: '10px',
    border: '1px dashed #CBD5E0'
  },
  emptySearchCard: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E2E8F0'
  },
  emptyText: {
    color: '#718096',
    fontSize: '14px',
    margin: 0
  },
  entryItem: {
    backgroundColor: '#FAFAFA',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #E2E8F0'
  },
  entryTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  dateText: {
    fontSize: '12px',
    backgroundColor: '#EDF2F7',
    padding: '3px 8px',
    borderRadius: '6px',
    color: '#4A5568',
    fontWeight: '600'
  },
  entryActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  textBtn: {
    background: 'none',
    border: 'none',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#E53E3E',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: 0
  },
  dotSeparator: {
    color: '#CBD5E0',
    fontSize: '12px'
  },
  entryTitle: {
    fontSize: '17px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    color: '#1A202C'
  },
  expandedContentContainer: {
    borderTop: '1px solid #E2E8F0',
    paddingTop: '16px',
    marginTop: '8px'
  },
  contentBox: {
    backgroundColor: '#FFFFFF',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    marginBottom: '14px'
  },
  entryContent: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#2D3748',
    margin: 0,
    whiteSpace: 'pre-line'
  },
  linksSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  linksLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.8px'
  },
  linksRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px'
  },
  linkAnchor: {
    textDecoration: 'none',
    fontWeight: '650'
  },
  dot: {
    color: '#CBD5E0'
  },
  timetableContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  ttForm: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    marginTop: '12px'
  },
  ttTableWrapper: {
    overflowX: 'auto',
    marginTop: '12px'
  },
  ttTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px'
  },
  ttTrHead: {
    borderBottom: '2px solid #E2E8F0',
    color: '#4A5568'
  },
  ttTh: {
    padding: '10px 12px',
    fontWeight: '700'
  },
  ttTr: {
    borderBottom: '1px solid #EDF2F7'
  },
  ttTd: {
    padding: '12px'
  }
};