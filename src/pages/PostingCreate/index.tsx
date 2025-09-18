import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionFooter from "@components/ActionFooter";
import type { PostingPost } from "@models/posting/posting.type";
import { Topbar } from "@components/Topbar";
import { postPosting } from "@apis/postings";
import type { Posting } from "@models/posting/posting.type";
import type { PostingDetailResponse } from "@models/posting/posting.dto";
import { toCamelCase } from "@utils/caseConvert";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import {
  PostingForm,
  TitleInput,
  DescriptionInput,
  CategorySelector,
  ImageUploader,
  PriceSelector,
  DateSelector,
} from "./components";
import ConfirmModal from "@components/ConfirmModal";

export default function PostingCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useGlobalLoading(isLoading, "공연 공고를 등록하는 중입니다...");

  const [formData, setFormData] = useState<Partial<PostingPost>>({
    title: "",
    description: "",
    categories: [],
    priceType: "free",
    priceAmount: undefined,
    date: new Date(),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successPostingId, setSuccessPostingId] = useState<number | null>(null);

  const handleInputChange = <K extends keyof PostingPost>(
    field: K,
    value: PostingPost[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!formData.description?.trim())
      newErrors.description = "설명을 입력해주세요.";
    if (!formData.categories?.length)
      newErrors.categories = "카테고리를 선택해주세요.";
    if (!formData.date) newErrors.date = "날짜를 선택해주세요.";
    if (formData.priceType === "paid" && !formData.priceAmount)
      newErrors.price_amount = "가격을 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload: PostingPost = {
      title: formData.title!,
      description: formData.description!,
      postingImage: selectedImage!, // File
      categories: formData.categories!,
      priceType: formData.priceType!,
      priceAmount:
        formData.priceType === "paid" ? formData.priceAmount : undefined,
      date: formData.date!, // Date
    };

    try {
      setIsLoading(true);
      const savedPosting = await postPosting(payload);
      const posting = toCamelCase<PostingDetailResponse, Posting>(savedPosting);
      setSuccessPostingId(posting.id);
      setIsSuccessOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    if (successPostingId) {
      navigate(`/announcements/${successPostingId}`);
    }
  };

  return (
    <>
      <Topbar title="공연 공고 작성" goBack={() => navigate(-1)} />
      <PostingForm>
        <PostingForm.Content>
          <PostingForm.Section title="제목" error={errors.title}>
            <TitleInput
              value={formData.title || ""}
              onChange={(value) => handleInputChange("title", value)}
            />
          </PostingForm.Section>
          <PostingForm.Section title="공연 설명" error={errors.description}>
            <DescriptionInput
              value={formData.description || ""}
              onChange={(value) => handleInputChange("description", value)}
            />
          </PostingForm.Section>
          <PostingForm.Section title="공연 날짜" error={errors.date}>
            <DateSelector
              value={formData.date || new Date()}
              onChange={(date) => handleInputChange("date", date)}
            />
          </PostingForm.Section>
          <PostingForm.Section title="공연 페이" error={errors.categories}>
            <PriceSelector
              priceType={formData.priceType ?? "free"}
              priceAmount={formData.priceAmount}
              onPriceTypeChange={(type) => handleInputChange("priceType", type)}
              onPriceAmountChange={(amount) =>
                handleInputChange("priceAmount", amount)
              }
            />
          </PostingForm.Section>
          <PostingForm.Section
            title="공연 카테고리"
            error={errors.price_amount}
          >
            <CategorySelector
              selected={formData.categories || []}
              onChange={(categories) =>
                handleInputChange("categories", categories)
              }
            />
          </PostingForm.Section>
          <PostingForm.Section title="사진 첨부" error={errors.image}>
            <ImageUploader
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
            />
          </PostingForm.Section>
        </PostingForm.Content>
        <ActionFooter
          nextLabel="등록하기"
          nextDisabled={isLoading}
          onNext={handleSubmit}
        />
        <ConfirmModal
          isOpen={isSuccessOpen}
          onClose={() => {
            setIsSuccessOpen(false);
            navigate("/announcements");
          }}
          onConfirm={handleSuccessConfirm}
          title="등록 완료"
          message="공연 공고가 등록되었습니다!"
          confirmLabel="내 공고 보기"
          cancelLabel="닫기"
        />
      </PostingForm>
    </>
  );
}
