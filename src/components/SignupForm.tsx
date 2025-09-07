// import React, { useState } from "react";
// import styled from "@emotion/styled";
// // import { UserRole, Artist, Space, Category } from "../types";

// const Container = styled.div`
//   padding: 20px;
//   max-width: 500px;
//   margin: 0 auto;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 700;
//   color: #333;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const Section = styled.section`
//   background: #f8f9fa;
//   border-radius: 12px;
//   padding: 20px;
// `;

// const SectionTitle = styled.h2`
//   font-size: 18px;
//   font-weight: 600;
//   color: #333;
//   margin-bottom: 16px;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   margin-bottom: 16px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   font-weight: 500;
//   color: #333;
// `;

// const Input = styled.input`
//   padding: 12px 16px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 16px;

//   &:focus {
//     outline: none;
//     border-color: #007bff;
//   }
// `;

// const TextArea = styled.textarea`
//   padding: 12px 16px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 16px;
//   min-height: 100px;
//   resize: vertical;

//   &:focus {
//     outline: none;
//     border-color: #007bff;
//   }
// `;

// const Select = styled.select`
//   padding: 12px 16px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 16px;
//   background: white;

//   &:focus {
//     outline: none;
//     border-color: #007bff;
//   }
// `;

// const CheckboxGroup = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 12px;
// `;

// const CheckboxItem = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 14px;
//   color: #333;
//   cursor: pointer;
// `;

// const Checkbox = styled.input`
//   width: 16px;
//   height: 16px;
// `;

// const Button = styled.button`
//   padding: 16px 24px;
//   background: #007bff;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: #0056b3;
//   }

//   &:disabled {
//     background: #6c757d;
//     cursor: not-allowed;
//   }
// `;

// interface SignupFormProps {
//   userRole: UserRole;
//   onComplete: (profile: Artist | Space) => void;
// }

// const SignupForm: React.FC<SignupFormProps> = ({ userRole, onComplete }) => {
//   const [formData, setFormData] = useState<any>({});

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev: any) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleArrayChange = (
//     field: string,
//     value: string,
//     checked: boolean
//   ) => {
//     setFormData((prev: any) => {
//       const currentArray = prev[field] || [];
//       if (checked) {
//         return { ...prev, [field]: [...currentArray, value] };
//       } else {
//         return {
//           ...prev,
//           [field]: currentArray.filter((item: string) => item !== value),
//         };
//       }
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onComplete(formData);
//   };

//   const performanceCategories = [
//     { value: "rock", label: "록/메탈" },
//     { value: "pop", label: "팝" },
//     { value: "jazz", label: "재즈" },
//     { value: "classical", label: "클래식" },
//     { value: "hiphop", label: "힙합" },
//     { value: "electronic", label: "일렉트로닉" },
//     { value: "folk", label: "포크" },
//     { value: "other", label: "기타" },
//   ];

//   const spaceCategories = [
//     { value: "club", label: "클럽" },
//     { value: "bar", label: "바" },
//     { value: "concert_hall", label: "콘서트홀" },
//     { value: "theater", label: "극장" },
//     { value: "cafe", label: "카페" },
//     { value: "outdoor", label: "야외" },
//     { value: "other", label: "기타" },
//   ];

//   const atmospheres = [
//     { value: "casual", label: "캐주얼" },
//     { value: "formal", label: "포멀" },
//     { value: "intimate", label: "친밀한" },
//     { value: "energetic", label: "에너지틱" },
//     { value: "romantic", label: "로맨틱" },
//     { value: "artistic", label: "아티스틱" },
//     { value: "modern", label: "모던" },
//     { value: "vintage", label: "빈티지" },
//   ];

//   const performanceTypes = [
//     { value: "concert", label: "콘서트" },
//     { value: "showcase", label: "쇼케이스" },
//     { value: "festival", label: "페스티벌" },
//     { value: "party", label: "파티" },
//     { value: "acoustic", label: "어쿠스틱" },
//     { value: "dj_set", label: "DJ 셋" },
//     { value: "other", label: "기타" },
//   ];

//   return (
//     <Container>
//       <Title>
//         {userRole === "artist" ? "공연예술가" : "공간보유자"} 회원가입
//       </Title>

//       <Form onSubmit={handleSubmit}>
//         {userRole === "artist" ? (
//           <>
//             <Section>
//               <SectionTitle>기본 정보</SectionTitle>

//               <FormGroup>
//                 <Label>활동명 *</Label>
//                 <Input
//                   type="text"
//                   placeholder="활동명을 입력하세요"
//                   value={formData.name || ""}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>소개글 *</Label>
//                 <TextArea
//                   placeholder="자신을 소개해주세요"
//                   value={formData.bio || ""}
//                   onChange={(e) => handleInputChange("bio", e.target.value)}
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>구성원 수 *</Label>
//                 <Input
//                   type="number"
//                   min="1"
//                   placeholder="구성원 수를 입력하세요"
//                   value={formData.number_of_members || ""}
//                   onChange={(e) =>
//                     handleInputChange(
//                       "number_of_members",
//                       parseInt(e.target.value)
//                     )
//                   }
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>공연 카테고리 *</Label>
//                 <Select
//                   value={formData.category || ""}
//                   onChange={(e) =>
//                     handleInputChange("category", e.target.value)
//                   }
//                   required
//                 >
//                   <option value="">카테고리를 선택하세요</option>
//                   {performanceCategories.map((cat) => (
//                     <option key={cat.value} value={cat.value}>
//                       {cat.label}
//                     </option>
//                   ))}
//                 </Select>
//               </FormGroup>

//               <FormGroup>
//                 <Label>희망 페이 (만원) *</Label>
//                 <Input
//                   type="number"
//                   min="0"
//                   placeholder="희망 페이를 입력하세요"
//                   value={formData.desired_pay || ""}
//                   onChange={(e) =>
//                     handleInputChange("desired_pay", parseInt(e.target.value))
//                   }
//                   required
//                 />
//               </FormGroup>
//             </Section>

//             <Section>
//               <SectionTitle>추가 정보</SectionTitle>

//               <FormGroup>
//                 <Label>필요 장비</Label>
//                 <Input
//                   type="text"
//                   placeholder="필요한 장비를 입력하세요 (쉼표로 구분)"
//                   value={formData.requiredEquipmentText || ""}
//                   onChange={(e) =>
//                     handleInputChange("requiredEquipmentText", e.target.value)
//                   }
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>활동지역 (구 단위)</Label>
//                 <Input
//                   type="text"
//                   placeholder="활동지역을 입력하세요 (쉼표로 구분)"
//                   value={formData.regionText || ""}
//                   onChange={(e) =>
//                     handleInputChange("regionText", e.target.value)
//                   }
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>포트폴리오 링크</Label>
//                 <Input
//                   type="text"
//                   placeholder="포트폴리오 링크를 입력하세요 (쉼표로 구분)"
//                   value={formData.portfolioLinksText || ""}
//                   onChange={(e) =>
//                     handleInputChange("portfolioLinksText", e.target.value)
//                   }
//                 />
//               </FormGroup>
//             </Section>
//           </>
//         ) : (
//           <>
//             <Section>
//               <SectionTitle>기본 정보</SectionTitle>

//               <FormGroup>
//                 <Label>사업자등록번호 *</Label>
//                 <Input
//                   type="text"
//                   placeholder="사업자등록번호를 입력하세요"
//                   value={formData.businessNumber || ""}
//                   onChange={(e) =>
//                     handleInputChange("businessNumber", e.target.value)
//                   }
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>공간명 *</Label>
//                 <Input
//                   type="text"
//                   placeholder="공간명을 입력하세요"
//                   value={formData.place_name || ""}
//                   onChange={(e) =>
//                     handleInputChange("place_name", e.target.value)
//                   }
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>공간 소개 *</Label>
//                 <TextArea
//                   placeholder="공간을 소개해주세요"
//                   value={formData.description || ""}
//                   onChange={(e) =>
//                     handleInputChange("description", e.target.value)
//                   }
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>공간 카테고리 *</Label>
//                 <Select
//                   value={formData.category || ""}
//                   onChange={(e) =>
//                     handleInputChange("category", e.target.value)
//                   }
//                   required
//                 >
//                   <option value="">카테고리를 선택하세요</option>
//                   {spaceCategories.map((cat) => (
//                     <option key={cat.value} value={cat.value}>
//                       {cat.label}
//                     </option>
//                   ))}
//                 </Select>
//               </FormGroup>
//             </Section>

//             <Section>
//               <SectionTitle>주소 정보</SectionTitle>

//               <FormGroup>
//                 <Label>상세 주소 *</Label>
//                 <Input
//                   type="text"
//                   placeholder="상세 주소를 입력하세요"
//                   value={formData.address || ""}
//                   onChange={(e) => handleInputChange("address", e.target.value)}
//                   required
//                 />
//               </FormGroup>
//             </Section>

//             <Section>
//               <SectionTitle>공간 정보</SectionTitle>

//               <FormGroup>
//                 <Label>좌석 수용 인원 *</Label>
//                 <Input
//                   type="number"
//                   min="1"
//                   placeholder="좌석 수용 인원을 입력하세요"
//                   value={formData.capacity_seated || ""}
//                   onChange={(e) =>
//                     handleInputChange(
//                       "capacity_seated",
//                       parseInt(e.target.value)
//                     )
//                   }
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>스탠딩 수용 인원 *</Label>
//                 <Input
//                   type="number"
//                   min="1"
//                   placeholder="스탠딩 수용 인원을 입력하세요"
//                   value={formData.capacity_standing || ""}
//                   onChange={(e) =>
//                     handleInputChange(
//                       "capacity_standing",
//                       parseInt(e.target.value)
//                     )
//                   }
//                   required
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>공간 분위기</Label>
//                 <CheckboxGroup>
//                   {atmospheres.map((atmosphere) => (
//                     <CheckboxItem key={atmosphere.value}>
//                       <Checkbox
//                         type="checkbox"
//                         checked={
//                           formData.atmosphere?.includes(atmosphere.value) ||
//                           false
//                         }
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "atmosphere",
//                             atmosphere.value,
//                             e.target.checked
//                           )
//                         }
//                       />
//                       {atmosphere.label}
//                     </CheckboxItem>
//                   ))}
//                 </CheckboxGroup>
//               </FormGroup>

//               <FormGroup>
//                 <Label>공연 형태</Label>
//                 <CheckboxGroup>
//                   {performanceTypes.map((type) => (
//                     <CheckboxItem key={type.value}>
//                       <Checkbox
//                         type="checkbox"
//                         checked={
//                           formData.performanceTypes?.includes(type.value) ||
//                           false
//                         }
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "performanceTypes",
//                             type.value,
//                             e.target.checked
//                           )
//                         }
//                       />
//                       {type.label}
//                     </CheckboxItem>
//                   ))}
//                 </CheckboxGroup>
//               </FormGroup>

//               <FormGroup>
//                 <Label>보유장비</Label>
//                 <Input
//                   type="text"
//                   placeholder="보유장비를 입력하세요 (쉼표로 구분)"
//                   value={formData.equipmentText || ""}
//                   onChange={(e) =>
//                     handleInputChange("equipmentText", e.target.value)
//                   }
//                 />
//               </FormGroup>
//             </Section>
//           </>
//         )}

//         <Button type="submit">회원가입 완료</Button>
//       </Form>
//     </Container>
//   );
// };

// export default SignupForm;
