// Numerology calculation library - Pythagorean System

export interface NumerologyReport {
  fullName: string;
  birthDate: string;
  lifePathNumber: number;
  lifePath: LifePathAnalysis;
  expressionNumber: number;
  expression: ExpressionAnalysis;
  soulUrgeNumber: number;
  soulUrge: SoulUrgeAnalysis;
  personalityNumber: number;
  personality: PersonalityAnalysis;
  birthdayNumber: number;
  birthday: BirthdayAnalysis;
  attitudeNumber: number;
  attitude: AttitudeAnalysis;
  personalYear: number;
  personalYearAnalysis: string;
  birthChart: BirthChart;
  lifeCycles: LifeCycles;
  pinnacles: Pinnacles;
}

interface LifePathAnalysis {
  meaning: string;
  strengths: string[];
  challenges: string[];
  career: string[];
  relationships: string;
}

interface ExpressionAnalysis {
  meaning: string;
  talents: string[];
  purpose: string;
}

interface SoulUrgeAnalysis {
  meaning: string;
  desires: string[];
  motivation: string;
}

interface PersonalityAnalysis {
  meaning: string;
  impression: string;
  traits: string[];
}

interface BirthdayAnalysis {
  meaning: string;
  gift: string;
}

interface AttitudeAnalysis {
  meaning: string;
  outlook: string;
}

interface BirthChart {
  numbers: { [key: number]: number };
  missing: number[];
  karmic: number[];
}

interface LifeCycles {
  first: { number: number; age: string; meaning: string };
  second: { number: number; age: string; meaning: string };
  third: { number: number; age: string; meaning: string };
}

interface Pinnacles {
  first: { number: number; age: string; meaning: string };
  second: { number: number; age: string; meaning: string };
  third: { number: number; age: string; meaning: string };
  fourth: { number: number; age: string; meaning: string };
}

const letterValues: { [key: string]: number } = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  Á: 1, À: 1, Ả: 1, Ã: 1, Ạ: 1,
  Ă: 1, Ắ: 1, Ằ: 1, Ẳ: 1, Ẵ: 1, Ặ: 1,
  Â: 1, Ấ: 1, Ầ: 1, Ẩ: 1, Ẫ: 1, Ậ: 1,
  É: 5, È: 5, Ẻ: 5, Ẽ: 5, Ẹ: 5,
  Ê: 5, Ế: 5, Ề: 5, Ể: 5, Ễ: 5, Ệ: 5,
  Í: 9, Ì: 9, Ỉ: 9, Ĩ: 9, Ị: 9,
  Ó: 6, Ò: 6, Ỏ: 6, Õ: 6, Ọ: 6,
  Ô: 6, Ố: 6, Ồ: 6, Ổ: 6, Ỗ: 6, Ộ: 6,
  Ơ: 6, Ớ: 6, Ờ: 6, Ở: 6, Ỡ: 6, Ợ: 6,
  Ú: 3, Ù: 3, Ủ: 3, Ũ: 3, Ụ: 3,
  Ư: 3, Ứ: 3, Ừ: 3, Ử: 3, Ữ: 3, Ự: 3,
  Ý: 7, Ỳ: 7, Ỷ: 7, Ỹ: 7, Ỵ: 7,
  Đ: 4,
};

const vowels = new Set(['A', 'E', 'I', 'O', 'U', 'Y', 'Á', 'À', 'Ả', 'Ã', 'Ạ', 'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ']);

function reduceToSingleDigit(num: number, allowMaster = true): number {
  while (num > 9) {
    if (allowMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

function calculateFromName(name: string, onlyVowels = false, onlyConsonants = false): number {
  const cleanName = name.toUpperCase().replace(/[^A-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/g, '');
  let sum = 0;

  for (const char of cleanName) {
    const isVowel = vowels.has(char);
    if (onlyVowels && !isVowel) continue;
    if (onlyConsonants && isVowel) continue;
    sum += letterValues[char] || 0;
  }

  return reduceToSingleDigit(sum);
}

function calculateLifePath(birthDate: string): number {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const daySum = reduceToSingleDigit(day);
  const monthSum = reduceToSingleDigit(month);
  const yearSum = reduceToSingleDigit(year);

  return reduceToSingleDigit(daySum + monthSum + yearSum);
}

function getLifePathAnalysis(number: number): LifePathAnalysis {
  const analyses: { [key: number]: LifePathAnalysis } = {
    1: {
      meaning: "Người tiên phong, lãnh đạo bẩm sinh với ý chí mạnh mẽ và quyết tâm cao.",
      strengths: ["Độc lập", "Sáng tạo", "Tự tin", "Dũng cảm", "Có tầm nhìn"],
      challenges: ["Độc đoán", "Cứng đầu", "Ích kỷ", "Thiếu kiên nhẫn"],
      career: ["Doanh nhân", "Giám đốc", "Phát minh", "Nghệ sĩ độc lập"],
      relationships: "Cần đối tác độc lập, tôn trọng không gian cá nhân. Phải học cách lắng nghe và chia sẻ quyền lực."
    },
    2: {
      meaning: "Người hòa giải, ngoại giao với khả năng cảm nhận và hợp tác tuyệt vời.",
      strengths: ["Nhạy cảm", "Kiên nhẫn", "Hợp tác", "Ngoại giao", "Trực giác tốt"],
      challenges: ["Quá nhạy cảm", "Thiếu tự tin", "Lệ thuộc", "Thiếu quyết đoán"],
      career: ["Tư vấn", "Ngoại giao", "Y tá", "Giáo viên", "Nghệ thuật"],
      relationships: "Cần mối quan hệ hài hòa, yêu thương. Là người đồng hành lý tưởng, luôn quan tâm đối phương."
    },
    3: {
      meaning: "Người sáng tạo, giao tiếp xuất sắc với khả năng biểu đạt và lạc quan.",
      strengths: ["Sáng tạo", "Giao tiếp tốt", "Lạc quan", "Xã hội", "Nghệ thuật"],
      challenges: ["Hay tán phát", "Thiếu tập trung", "Bề nổi", "Lãng phí"],
      career: ["Nghệ sĩ", "Diễn giả", "Nhà văn", "Marketing", "Giải trí"],
      relationships: "Cần tự do và sự phấn khích. Mang lại niềm vui và sự sống động cho mối quan hệ."
    },
    4: {
      meaning: "Người xây dựng, thực tế với tính kỷ luật và trách nhiệm cao.",
      strengths: ["Thực tế", "Kỷ luật", "Tổ chức tốt", "Chăm chỉ", "Đáng tin cậy"],
      challenges: ["Cứng nhắc", "Quá thận trọng", "Thiếu linh hoạt", "Công việc quá"],
      career: ["Kỹ sư", "Kế toán", "Quản lý", "Xây dựng", "Luật sư"],
      relationships: "Trung thành và đáng tin cậy. Cần đối tác ổn định, đánh giá hành động hơn lời nói."
    },
    5: {
      meaning: "Người tự do, phiêu lưu với khát khao trải nghiệm và thay đổi.",
      strengths: ["Linh hoạt", "Tự do", "Năng động", "Giao tiếp", "Đa tài"],
      challenges: ["Bất ổn", "Thiếu cam kết", "Bốc đồng", "Thiếu kiên nhẫn"],
      career: ["Du lịch", "Báo chí", "Bán hàng", "Giải trí", "Tư vấn"],
      relationships: "Cần tự do và không gian. Mối quan hệ phải thú vị và đa dạng."
    },
    6: {
      meaning: "Người nuôi dưỡng, trách nhiệm với gia đình và cộng đồng.",
      strengths: ["Trách nhiệm", "Yêu thương", "Hòa giải", "Nghệ thuật", "Chữa lành"],
      challenges: ["Quá lo lắng", "Kiểm soát", "Hy sinh quá mức", "Hoàn hảo chủ nghĩa"],
      career: ["Giáo viên", "Y tá", "Tư vấn", "Thiết kế", "Công tác xã hội"],
      relationships: "Cam kết và chăm sóc. Cần được đánh giá và không bị lợi dụng lòng tốt."
    },
    7: {
      meaning: "Người tìm kiếm chân lý, phân tích với trí tuệ và tâm linh sâu sắc.",
      strengths: ["Trí tuệ", "Phân tích", "Tâm linh", "Trực giác", "Nghiên cứu"],
      challenges: ["Cô lập", "Hoài nghi", "Lạnh lùng", "Khó gần"],
      career: ["Nghiên cứu", "Khoa học", "Tâm linh", "Phân tích", "Giáo sư"],
      relationships: "Cần không gian riêng tư và kết nối sâu sắc. Khó mở lòng nhưng trung thành."
    },
    8: {
      meaning: "Người quyền lực, thành công với khả năng quản lý và tài chính xuất sắc.",
      strengths: ["Tài chính", "Quyền lực", "Tổ chức", "Tham vọng", "Lãnh đạo"],
      challenges: ["Vật chất hóa", "Độc đoán", "Công việc quá", "Thiếu cân bằng"],
      career: ["Kinh doanh", "Tài chính", "Quản lý", "Đầu tư", "Giám đốc"],
      relationships: "Cần đối tác mạnh mẽ và độc lập. Phải cân bằng giữa sự nghiệp và tình cảm."
    },
    9: {
      meaning: "Người nhân đạo, hoàn thiện với tình yêu thương và sự hy sinh cho nhân loại.",
      strengths: ["Nhân đạo", "Từ bi", "Nghệ thuật", "Sáng tạo", "Lý tưởng"],
      challenges: ["Lý tưởng hóa", "Tự hy sinh", "Cảm xúc", "Khó buông bỏ"],
      career: ["Từ thiện", "Nghệ thuật", "Chữa lành", "Giảng dạy", "Tư vấn"],
      relationships: "Yêu sâu đậm và vô điều kiện. Cần học cách yêu bản thân trước."
    },
    11: {
      meaning: "Số Chủ 11 - Người truyền cảm hứng, trực giác mạnh mẽ với sứ mệnh tâm linh cao.",
      strengths: ["Trực giác mạnh", "Truyền cảm hứng", "Tâm linh", "Sáng tạo", "Lãnh đạo tinh thần"],
      challenges: ["Căng thẳng cao", "Nhạy cảm quá mức", "Lý tưởng hóa", "Áp lực bản thân"],
      career: ["Giáo viên tâm linh", "Nghệ sĩ", "Tư vấn", "Chữa lành", "Diễn giả"],
      relationships: "Cần kết nối sâu sắc và tâm linh. Đối tác phải hiểu và hỗ trợ sứ mệnh của họ."
    },
    22: {
      meaning: "Số Chủ 22 - Kiến trúc sư vĩ đại, khả năng biến ý tưởng thành hiện thực.",
      strengths: ["Xây dựng vĩ đại", "Thực tế cao", "Tầm nhìn", "Lãnh đạo", "Tổ chức xuất sắc"],
      challenges: ["Áp lực lớn", "Hoàn hảo chủ nghĩa", "Công việc quá mức", "Căng thẳng"],
      career: ["Doanh nhân lớn", "Kiến trúc sư", "Chính trị", "Tổ chức quốc tế", "Nhà từ thiện"],
      relationships: "Cần đối tác hiểu và hỗ trợ tham vọng lớn. Phải học cách cân bằng."
    },
    33: {
      meaning: "Số Chủ 33 - Thầy giáo vĩ đại, yêu thương vô điều kiện và chữa lành.",
      strengths: ["Yêu thương cao", "Chữa lành", "Hướng dẫn", "Từ bi", "Hy sinh cao cả"],
      challenges: ["Hy sinh quá mức", "Áp lực tâm linh", "Quá quan tâm người khác", "Bỏ quên bản thân"],
      career: ["Chữa lành", "Giáo viên", "Từ thiện", "Nghệ thuật", "Lãnh đạo tâm linh"],
      relationships: "Yêu sâu sắc và chữa lành. Cần học cách tự chăm sóc bản thân."
    }
  };

  return analyses[number] || analyses[1];
}

function getExpressionAnalysis(number: number): ExpressionAnalysis {
  const analyses: { [key: number]: ExpressionAnalysis } = {
    1: {
      meaning: "Bạn sinh ra để lãnh đạo và tiên phong trong các lĩnh vực mới.",
      talents: ["Lãnh đạo", "Khởi xướng", "Sáng tạo độc đáo", "Quyết đoán"],
      purpose: "Trở thành người dẫn đầu, mở đường cho người khác theo."
    },
    2: {
      meaning: "Bạn sinh ra để hòa giải và kết nối mọi người.",
      talents: ["Ngoại giao", "Hợp tác", "Nhạy cảm", "Hỗ trợ"],
      purpose: "Tạo sự hài hòa và hòa bình trong mọi mối quan hệ."
    },
    3: {
      meaning: "Bạn sinh ra để sáng tạo và truyền cảm hứng qua nghệ thuật.",
      talents: ["Sáng tạo nghệ thuật", "Giao tiếp", "Giải trí", "Khuyến khích"],
      purpose: "Mang niềm vui và cảm hứng cho thế giới."
    },
    4: {
      meaning: "Bạn sinh ra để xây dựng nền tảng vững chắc cho tương lai.",
      talents: ["Tổ chức", "Xây dựng hệ thống", "Quản lý", "Thực tế"],
      purpose: "Tạo ra cấu trúc và trật tự ổn định."
    },
    5: {
      meaning: "Bạn sinh ra để khám phá và mang đến tự do cho người khác.",
      talents: ["Linh hoạt", "Truyền thông", "Phiêu lưu", "Đổi mới"],
      purpose: "Khám phá thế giới và chia sẻ kiến thức."
    },
    6: {
      meaning: "Bạn sinh ra để chăm sóc và nuôi dưỡng cộng đồng.",
      talents: ["Chăm sóc", "Tư vấn", "Sáng tạo nghệ thuật", "Hòa giải"],
      purpose: "Tạo môi trường yêu thương và hài hòa."
    },
    7: {
      meaning: "Bạn sinh ra để tìm kiếm và chia sẻ trí tuệ sâu sắc.",
      talents: ["Nghiên cứu", "Phân tích", "Tâm linh", "Giảng dạy"],
      purpose: "Khám phá chân lý và chia sẻ hiểu biết."
    },
    8: {
      meaning: "Bạn sinh ra để tạo ra sự thịnh vượng và quyền lực.",
      talents: ["Kinh doanh", "Quản lý tài chính", "Tổ chức", "Lãnh đạo"],
      purpose: "Đạt thành công vật chất và giúp đỡ người khác thịnh vượng."
    },
    9: {
      meaning: "Bạn sinh ra để phục vụ nhân loại với tình yêu thương.",
      talents: ["Nhân đạo", "Nghệ thuật", "Chữa lành", "Từ bi"],
      purpose: "Nâng cao ý thức và yêu thương của nhân loại."
    },
    11: {
      meaning: "Bạn sinh ra để truyền cảm hứng tâm linh cho thế giới.",
      talents: ["Trực giác", "Truyền cảm hứng", "Tâm linh", "Hướng dẫn"],
      purpose: "Nâng cao ý thức tâm linh của nhân loại."
    },
    22: {
      meaning: "Bạn sinh ra để xây dựng những dự án vĩ đại phục vụ nhân loại.",
      talents: ["Tầm nhìn lớn", "Tổ chức quy mô lớn", "Thực thi", "Lãnh đạo"],
      purpose: "Biến ý tưởng lớn thành hiện thực phục vụ thế giới."
    },
    33: {
      meaning: "Bạn sinh ra để yêu thương và chữa lành thế giới.",
      talents: ["Yêu thương vô điều kiện", "Chữa lành", "Giảng dạy", "Hướng dẫn tâm linh"],
      purpose: "Nâng tầm yêu thương và chữa lành cho nhân loại."
    }
  };

  return analyses[number] || analyses[1];
}

function getSoulUrgeAnalysis(number: number): SoulUrgeAnalysis {
  const analyses: { [key: number]: SoulUrgeAnalysis } = {
    1: { meaning: "Khao khát độc lập và tự do thể hiện bản thân.", desires: ["Tự chủ", "Lãnh đạo", "Công nhận cá nhân"], motivation: "Khát vọng trở thành số một và được công nhận." },
    2: { meaning: "Khao khát hòa bình và quan hệ hài hòa.", desires: ["Hòa bình", "Hợp tác", "Yêu thương"], motivation: "Mong muốn kết nối và hòa giải." },
    3: { meaning: "Khao khát sáng tạo và tự thể hiện.", desires: ["Sáng tạo", "Vui vẻ", "Được chú ý"], motivation: "Đam mê nghệ thuật và giao tiếp." },
    4: { meaning: "Khao khát ổn định và trật tự.", desires: ["An toàn", "Trật tự", "Xây dựng"], motivation: "Mong muốn tạo nền tảng vững chắc." },
    5: { meaning: "Khao khát tự do và trải nghiệm.", desires: ["Tự do", "Phiêu lưu", "Đa dạng"], motivation: "Khát khao khám phá và thay đổi." },
    6: { meaning: "Khao khát yêu thương và hài hòa gia đình.", desires: ["Yêu thương", "Gia đình", "Chăm sóc"], motivation: "Mong muốn nuôi dưỡng và bảo vệ." },
    7: { meaning: "Khao khát hiểu biết và tâm linh.", desires: ["Trí tuệ", "Tâm linh", "Chân lý"], motivation: "Tìm kiếm ý nghĩa sâu xa của cuộc sống." },
    8: { meaning: "Khao khát thành công và quyền lực.", desires: ["Thành công", "Quyền lực", "Sự công nhận"], motivation: "Tham vọng đạt đỉnh cao." },
    9: { meaning: "Khao khát phục vụ nhân loại.", desires: ["Nhân đạo", "Giúp đỡ", "Yêu thương toàn cầu"], motivation: "Mong muốn làm cho thế giới tốt đẹp hơn." },
    11: { meaning: "Khao khát kết nối tâm linh sâu sắc.", desires: ["Giác ngộ", "Truyền cảm hứng", "Tầm nhìn"], motivation: "Sứ mệnh tâm linh cao." },
    22: { meaning: "Khao khát tạo di sản vĩ đại.", desires: ["Xây dựng lớn", "Di sản", "Ảnh hưởng toàn cầu"], motivation: "Khát vọng thay đổi thế giới." },
    33: { meaning: "Khao khát yêu thương và chữa lành toàn cầu.", desires: ["Yêu thương vô điều kiện", "Chữa lành", "Phục vụ"], motivation: "Sứ mệnh yêu thương cao nhất." }
  };

  return analyses[number] || analyses[1];
}

function getPersonalityAnalysis(number: number): PersonalityAnalysis {
  const analyses: { [key: number]: PersonalityAnalysis } = {
    1: { meaning: "Ấn tượng mạnh mẽ và tự tin.", impression: "Người khác thấy bạn là người lãnh đạo tự tin.", traits: ["Quyết đoán", "Độc lập", "Năng động"] },
    2: { meaning: "Ấn tượng nhẹ nhàng và dễ gần.", impression: "Người khác thấy bạn là người dễ chịu và đáng tin.", traits: ["Nhẹ nhàng", "Hợp tác", "Thân thiện"] },
    3: { meaning: "Ấn tượng vui vẻ và sáng tạo.", impression: "Người khác thấy bạn là người thú vị và tài năng.", traits: ["Vui tươi", "Biểu cảm", "Hấp dẫn"] },
    4: { meaning: "Ấn tượng đáng tin cậy và vững chắc.", impression: "Người khác thấy bạn là người đáng tin và nghiêm túc.", traits: ["Đáng tin", "Thực tế", "Ổn định"] },
    5: { meaning: "Ấn tượng năng động và hấp dẫn.", impression: "Người khác thấy bạn là người thú vị và tự do.", traits: ["Năng động", "Linh hoạt", "Hấp dẫn"] },
    6: { meaning: "Ấn tượng ấm áp và quan tâm.", impression: "Người khác thấy bạn là người trách nhiệm và chăm sóc.", traits: ["Ấm áp", "Chăm sóc", "Đáng tin"] },
    7: { meaning: "Ấn tượng bí ẩn và trí tuệ.", impression: "Người khác thấy bạn là người sâu sắc và khó hiểu.", traits: ["Bí ẩn", "Trí tuệ", "Độc lập"] },
    8: { meaning: "Ấn tượng quyền lực và thành công.", impression: "Người khác thấy bạn là người mạnh mẽ và có quyền uy.", traits: ["Quyền uy", "Tự tin", "Chuyên nghiệp"] },
    9: { meaning: "Ấn tượng từ bi và nghệ sĩ.", impression: "Người khác thấy bạn là người đầy tình thương và lý tưởng.", traits: ["Từ bi", "Lý tưởng", "Nghệ sĩ"] },
    11: { meaning: "Ấn tượng sáng sủa và truyền cảm hứng.", impression: "Người khác thấy bạn là người đặc biệt và truyền cảm hứng.", traits: ["Truyền cảm hứng", "Trực giác", "Độc đáo"] },
    22: { meaning: "Ấn tượng vĩ đại và có tầm nhìn.", impression: "Người khác thấy bạn là người có tầm và khả năng đặc biệt.", traits: ["Tầm nhìn", "Mạnh mẽ", "Ấn tượng"] },
    33: { meaning: "Ấn tượng yêu thương và chữa lành.", impression: "Người khác thấy bạn là người đầy yêu thương và chữa lành.", traits: ["Yêu thương", "Chữa lành", "Hướng dẫn"] }
  };

  return analyses[number] || analyses[1];
}

function getBirthdayAnalysis(day: number): BirthdayAnalysis {
  const analyses: { [key: number]: BirthdayAnalysis } = {
    1: { meaning: "Ngày sinh của người lãnh đạo.", gift: "Khả năng khởi xướng và lãnh đạo tự nhiên." },
    2: { meaning: "Ngày sinh của người hòa giải.", gift: "Khả năng cảm nhận và kết nối người khác." },
    3: { meaning: "Ngày sinh của người sáng tạo.", gift: "Khả năng biểu đạt và sáng tạo nghệ thuật." },
    4: { meaning: "Ngày sinh của người xây dựng.", gift: "Khả năng tổ chức và xây dựng vững chắc." },
    5: { meaning: "Ngày sinh của người tự do.", gift: "Khả năng thích nghi và giao tiếp linh hoạt." },
    6: { meaning: "Ngày sinh của người nuôi dưỡng.", gift: "Khả năng chăm sóc và tạo hài hòa." },
    7: { meaning: "Ngày sinh của người tìm kiếm.", gift: "Khả năng phân tích và hiểu biết sâu sắc." },
    8: { meaning: "Ngày sinh của người quyền lực.", gift: "Khả năng quản lý và đạt thành công vật chất." },
    9: { meaning: "Ngày sinh của người hoàn thiện.", gift: "Khả năng yêu thương và phục vụ nhân loại." },
    10: { meaning: "Ngày sinh của người tiềm năng.", gift: "Kết hợp độc lập (1) và tiềm năng (0)." },
    11: { meaning: "Ngày sinh của người trực giác.", gift: "Trực giác mạnh mẽ và khả năng truyền cảm hứng." },
    12: { meaning: "Ngày sinh của người biểu đạt.", gift: "Kết hợp lãnh đạo và sáng tạo." },
    13: { meaning: "Ngày sinh của người chuyển hóa.", gift: "Khả năng làm việc chăm chỉ và tái tạo." },
    14: { meaning: "Ngày sinh của người cân bằng.", gift: "Kết hợp xây dựng và tự do." },
    15: { meaning: "Ngày sinh của người hài hòa.", gift: "Kết hợp tự do và trách nhiệm." },
    16: { meaning: "Ngày sinh của người tâm linh.", gift: "Khả năng phân tích sâu và trực giác." },
    17: { meaning: "Ngày sinh của người thành công.", gift: "Kết hợp trí tuệ và quyền lực." },
    18: { meaning: "Ngày sinh của người nhân đạo.", gift: "Kết hợp lãnh đạo và nhân đạo." },
    19: { meaning: "Ngày sinh của người độc lập hoàn thiện.", gift: "Khởi đầu và kết thúc, chu kỳ hoàn chỉnh." },
    20: { meaning: "Ngày sinh của người nhạy cảm.", gift: "Nhạy cảm cao và khả năng hợp tác." },
    21: { meaning: "Ngày sinh của người sáng tạo xã hội.", gift: "Kết hợp hợp tác và sáng tạo." },
    22: { meaning: "Ngày sinh của kiến trúc sư.", gift: "Khả năng xây dựng những điều vĩ đại." },
    23: { meaning: "Ngày sinh của người giao tiếp.", gift: "Kết hợp hợp tác và biểu đạt." },
    24: { meaning: "Ngày sinh của người chăm sóc gia đình.", gift: "Kết hợp hợp tác và trách nhiệm." },
    25: { meaning: "Ngày sinh của người trực giác mạnh.", gift: "Kết hợp nhạy cảm và tự do." },
    26: { meaning: "Ngày sinh của người kinh doanh gia đình.", gift: "Kết hợp hợp tác và quyền lực." },
    27: { meaning: "Ngày sinh của người nhân đạo sáng tạo.", gift: "Kết hợp hợp tác và nhân đạo." },
    28: { meaning: "Ngày sinh của người lãnh đạo độc lập.", gift: "Kết hợp hợp tác và độc lập." },
    29: { meaning: "Ngày sinh của người trực giác cao.", gift: "Trực giác và nhạy cảm cực cao." },
    30: { meaning: "Ngày sinh của người biểu đạt sáng tạo.", gift: "Biểu đạt và sáng tạo nghệ thuật." },
    31: { meaning: "Ngày sinh của người xây dựng sáng tạo.", gift: "Kết hợp sáng tạo và xây dựng thực tế." }
  };

  return analyses[day] || analyses[1];
}

function getAttitudeAnalysis(number: number): AttitudeAnalysis {
  const analyses: { [key: number]: AttitudeAnalysis } = {
    1: { meaning: "Thái độ tự tin và quyết đoán.", outlook: "Tiếp cận cuộc sống với sự tự tin và quyết tâm." },
    2: { meaning: "Thái độ hợp tác và kiên nhẫn.", outlook: "Tiếp cận cuộc sống với sự hòa bình và hợp tác." },
    3: { meaning: "Thái độ lạc quan và sáng tạo.", outlook: "Tiếp cận cuộc sống với niềm vui và sáng tạo." },
    4: { meaning: "Thái độ thực tế và chăm chỉ.", outlook: "Tiếp cận cuộc sống với sự nghiêm túc và kỷ luật." },
    5: { meaning: "Thái độ linh hoạt và phiêu lưu.", outlook: "Tiếp cận cuộc sống với sự tò mò và phiêu lưu." },
    6: { meaning: "Thái độ trách nhiệm và quan tâm.", outlook: "Tiếp cận cuộc sống với tình yêu thương và trách nhiệm." },
    7: { meaning: "Thái độ phân tích và suy ngẫm.", outlook: "Tiếp cận cuộc sống với sự sâu sắc và tìm tòi." },
    8: { meaning: "Thái độ tham vọng và quyền lực.", outlook: "Tiếp cận cuộc sống với tham vọng và quyết tâm thành công." },
    9: { meaning: "Thái độ từ bi và nhân đạo.", outlook: "Tiếp cận cuộc sống với tình yêu thương và hiểu biết." }
  };

  return analyses[number] || analyses[1];
}

function calculateBirthChart(birthDate: string): BirthChart {
  const digits = birthDate.replace(/\D/g, '').split('').map(Number);
  const numbers: { [key: number]: number } = {};

  for (let i = 1; i <= 9; i++) {
    numbers[i] = 0;
  }

  for (const digit of digits) {
    if (digit > 0 && digit <= 9) {
      numbers[digit]++;
    }
  }

  const missing: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (numbers[i] === 0) {
      missing.push(i);
    }
  }

  const karmic = [13, 14, 16, 19];

  return { numbers, missing, karmic };
}

function calculateLifeCycles(birthDate: string): LifeCycles {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const first = reduceToSingleDigit(month);
  const second = reduceToSingleDigit(day);
  const third = reduceToSingleDigit(year);

  const lifePathNumber = calculateLifePath(birthDate);
  const firstCycleEnd = 36 - lifePathNumber;
  const secondCycleEnd = firstCycleEnd + 27;

  return {
    first: {
      number: first,
      age: `0-${firstCycleEnd}`,
      meaning: `Chu kỳ đầu tiên, giai đoạn học hỏi và phát triển cơ bản.`
    },
    second: {
      number: second,
      age: `${firstCycleEnd + 1}-${secondCycleEnd}`,
      meaning: `Chu kỳ thứ hai, giai đoạn trưởng thành và phát triển sự nghiệp.`
    },
    third: {
      number: third,
      age: `${secondCycleEnd + 1}+`,
      meaning: `Chu kỳ thứ ba, giai đoạn hoàn thiện và trí tuệ.`
    }
  };
}

function calculatePinnacles(birthDate: string): Pinnacles {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(year);

  const first = reduceToSingleDigit(monthReduced + dayReduced);
  const second = reduceToSingleDigit(dayReduced + yearReduced);
  const third = reduceToSingleDigit(first + second);
  const fourth = reduceToSingleDigit(monthReduced + yearReduced);

  const lifePathNumber = calculateLifePath(birthDate);
  const firstPinnacleEnd = 36 - lifePathNumber;
  const secondPinnacleEnd = firstPinnacleEnd + 9;
  const thirdPinnacleEnd = secondPinnacleEnd + 9;

  return {
    first: {
      number: first,
      age: `0-${firstPinnacleEnd}`,
      meaning: `Đỉnh cao đầu tiên, giai đoạn học tập và phát triển ban đầu.`
    },
    second: {
      number: second,
      age: `${firstPinnacleEnd + 1}-${secondPinnacleEnd}`,
      meaning: `Đỉnh cao thứ hai, giai đoạn xây dựng nền tảng.`
    },
    third: {
      number: third,
      age: `${secondPinnacleEnd + 1}-${thirdPinnacleEnd}`,
      meaning: `Đỉnh cao thứ ba, giai đoạn thu hoạch và phát triển.`
    },
    fourth: {
      number: fourth,
      age: `${thirdPinnacleEnd + 1}+`,
      meaning: `Đỉnh cao thứ tư, giai đoạn hoàn thiện và trí tuệ.`
    }
  };
}

function calculatePersonalYear(birthDate: string, currentYear: number): number {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(currentYear);

  return reduceToSingleDigit(dayReduced + monthReduced + yearReduced);
}

function getPersonalYearAnalysis(number: number): string {
  const analyses: { [key: number]: string } = {
    1: "Năm mới bắt đầu - Năm của sự khởi đầu mới, cơ hội mới, và sự tự tin. Đây là thời điểm để bắt đầu dự án mới và thể hiện bản thân.",
    2: "Năm hợp tác - Năm của sự kiên nhẫn, hợp tác và phát triển mối quan hệ. Tập trung vào làm việc nhóm và xây dựng kết nối.",
    3: "Năm sáng tạo - Năm của sự sáng tạo, giao tiếp và biểu đạt bản thân. Thời gian tuyệt vời cho nghệ thuật và xã hội.",
    4: "Năm xây dựng - Năm của sự chăm chỉ, kỷ luật và xây dựng nền tảng. Tập trung vào công việc và tổ chức cuộc sống.",
    5: "Năm thay đổi - Năm của sự tự do, thay đổi và phiêu lưu. Đón nhận cơ hội mới và trải nghiệm khác biệt.",
    6: "Năm trách nhiệm - Năm của gia đình, trách nhiệm và chăm sóc. Tập trung vào nhà cửa và người thân.",
    7: "Năm nội tâm - Năm của sự tự suy ngẫm, học tập và phát triển tâm linh. Thời gian để tìm hiểu bản thân.",
    8: "Năm thành công - Năm của sự thành tựu, quyền lực và thịnh vượng vật chất. Tập trung vào sự nghiệp và tài chính.",
    9: "Năm hoàn thiện - Năm của sự kết thúc, hoàn thiện và buông bỏ. Chuẩn bị cho chu kỳ mới và phục vụ người khác."
  };

  return analyses[number] || analyses[1];
}

export function generateNumerologyReport(fullName: string, birthDate: string): NumerologyReport {
  const currentYear = new Date().getFullYear();
  const birthDateObj = new Date(birthDate);
  const day = birthDateObj.getDate();
  const month = birthDateObj.getMonth() + 1;

  const lifePathNumber = calculateLifePath(birthDate);
  const expressionNumber = calculateFromName(fullName);
  const soulUrgeNumber = calculateFromName(fullName, true);
  const personalityNumber = calculateFromName(fullName, false, true);
  const birthdayNumber = reduceToSingleDigit(day);
  const attitudeNumber = reduceToSingleDigit(day + month);
  const personalYear = calculatePersonalYear(birthDate, currentYear);

  return {
    fullName,
    birthDate,
    lifePathNumber,
    lifePath: getLifePathAnalysis(lifePathNumber),
    expressionNumber,
    expression: getExpressionAnalysis(expressionNumber),
    soulUrgeNumber,
    soulUrge: getSoulUrgeAnalysis(soulUrgeNumber),
    personalityNumber,
    personality: getPersonalityAnalysis(personalityNumber),
    birthdayNumber,
    birthday: getBirthdayAnalysis(day),
    attitudeNumber,
    attitude: getAttitudeAnalysis(attitudeNumber),
    personalYear,
    personalYearAnalysis: getPersonalYearAnalysis(personalYear),
    birthChart: calculateBirthChart(birthDate),
    lifeCycles: calculateLifeCycles(birthDate),
    pinnacles: calculatePinnacles(birthDate)
  };
}
