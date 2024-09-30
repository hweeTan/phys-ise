import createLanguages from 'simple-languages'
import formatString from 'simple-languages/formatString-react'

const i18n = createLanguages()

i18n.lang = 'en'

i18n.data = {
  en: {
    // Tools
    video_settings: 'Video settings',
    ruler: 'Ruler',
    axis: 'Axis',
    point: 'Create points',
    collision: 'Analyze - Draw vectors',

    // Header
    pick_video: 'Pick video',
    open: 'Open file',
    save: 'Save file',

    // Input
    length: 'Length (m)',
    x1: 'x1',
    y1: 'y1',
    x2: 'x2',
    y2: 'y2',
    x: 'x',
    y: 'y',
    angle: 'Angle offset to x axis (degree)',
    name: 'Name',
    mass: 'm (kg)',
    frameRate: 'Frame rate',
    start: 'Start frame',
    end: 'End frame',
    collisionTime: 'Collision frame',
    collisionStart: 'Start frame',
    collisionEnd: 'End frame',
    'point-k': 'k (N/m)',
    zoom: 'Ratio',

    // PhysletsInfo
    table: 'Table',
    graph: 'Graph',

    // Tools
    on_off: 'Toggle',
    create_point: 'Create point',
    analyze: 'Analyze',
    toggle_analyze: 'Toggle',
    momentum: 'Momentum',
    force: 'Force',
    velocity: 'Velocity',
    before_collision: 'Before collision',
    after_collision: 'After collision',

    // Colors
    pink: 'Pink',
    purple: 'Purple',
    green: 'Green',
    blue: 'Blue',
    gray: 'Gray',
    black: 'Black',

    // Formulas
    t: 't',
    s_unit: 's',
    x_label: 'x',
    m_unit: 'm',
    y_label: 'y',
    vx: 'vx',
    'm/s_unit': 'm/s',
    vy: 'vy',
    v: 'v',
    ax: 'ax',
    'm/s^2_unit': 'm/s^2',
    ay: 'ay',
    a: 'a',
    m: 'm',
    kg_unit: 'kg',
    px: 'px',
    'kg.m/s_unit': 'kg.m/s',
    py: 'py',
    p: 'p',
    F: 'F',
    N_unit: 'N',
    Ep: 'Ep',
    J_unit: 'J',
    Wdh: 'Wdh',
    Ek: 'Ek',
    E: 'E',
    E2: 'E2',
    angle_label: 'angle',
    angle_unit: 'deg',

    // AnalyzingPanel
    analyze_graph: 'Analyze graph',
    default: 'Default',
    please_pick_an_option: 'Please pick an option',
    auto: 'Estimate best-fit',
    linear: 'Linear',
    parabol: 'Parabola',
    cosine: 'Cosine',
    sine: 'Sine',
    settings: 'Settings',
    from: 'From',
    to: 'To',
    total: 'Total',
    show_force: 'Show Force',
    hide_force: 'Hide Force',
  },
  vi: {
    // Tools
    video_settings: 'Tùy chỉnh video',
    ruler: 'Thước chuẩn',
    axis: 'Hệ trục',
    point: 'Tạo vật tương tác',
    collision: 'Tính toán - Vẽ vector',

    // Header
    pick_video: 'Chọn video',
    open: 'Mở bài',
    save: 'Lưu bài',

    // Input
    length: 'Độ dài (m)',
    x1: 'x1',
    y1: 'y1',
    x2: 'x2',
    y2: 'y2',
    x: 'x',
    y: 'y',
    angle: 'Góc so với trục x (degree)',
    name: 'Tên',
    mass: 'm (kg)',
    frameRate: 'Frame rate',
    start: 'Điểm đầu',
    end: 'Điểm cuối',
    collisionTime: 'Va chạm',
    collisionStart: 'Đầu',
    collisionEnd: 'Cuối',
    'point-k': 'k (N/m)',
    zoom: 'Tỉ lệ',

    // PhysletsInfo
    table: 'Bảng',
    graph: 'Đồ Thị',

    // Tools
    on_off: 'Bật/Tắt',
    create_point: 'Tạo điểm',
    analyze: 'Phân tích',
    toggle_analyze: 'Bật/Tắt',
    momentum: 'Động lượng',
    force: 'Lực',
    velocity: 'Vận tốc',
    before_collision: 'Trước va chạm',
    after_collision: 'Sau va chạm',

    // Colors
    pink: 'Hồng',
    purple: 'Tím',
    green: 'Lục',
    blue: 'Lam',
    gray: 'Xám',
    black: 'Đen',

    // Formulas
    t: 't',
    s_unit: 's',
    x_label: 'x',
    m_unit: 'm',
    y_label: 'y',
    vx: 'vx',
    'm/s_unit': 'm/s',
    vy: 'vy',
    v: 'v',
    ax: 'ax',
    'm/s^2_unit': 'm/s^2',
    ay: 'ay',
    a: 'a',
    m: 'm',
    kg_unit: 'kg',
    px: 'px',
    'kg.m/s_unit': 'kg.m/s',
    py: 'py',
    p: 'p',
    F: 'F',
    N_unit: 'N',
    Ep: 'Wtt',
    J_unit: 'J',
    Wdh: 'Wtđh',
    Ek: 'Wđ',
    E: 'W1',
    E2: 'W2',
    angle_label: 'góc',
    angle_unit: 'độ',

    // AnalyzingPanel
    analyze_graph: 'Phân tích đồ thị',
    default: 'Mặc định',
    please_pick_an_option: 'Hãy chọn phương trình',
    auto: 'Tính tự động',
    linear: 'bậc 1',
    parabol: 'bậc 2',
    cosine: 'hàm cos',
    sine: 'hàm sin',
    settings: 'Tùy chỉnh',
    from: 'Từ',
    to: 'Đến',
    total: 'Tổng',
    show_force: 'Hiển thị Lực',
    hide_force: 'Ẩn Lực',
  },
}

i18n.formatString = formatString

export default i18n
