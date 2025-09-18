import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionFooter from "@components/ActionFooter";
import type { PostingPost } from "@models/posting/posting.type";
import { Topbar } from "@components/Topbar";
import { usePostPostingMutation } from "@queries/postings";
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
  const { mutateAsync: createPosting, isPending } = usePostPostingMutation();
  useGlobalLoading(isPending, "공연 공고를 등록하는 중입니다...");

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

  const handlePriceAmountChange = (amount: number) => {
    setFormData((prev) => {
      const nextAmount = Number.isFinite(amount) ? amount : 0;
      const nextType =
        prev.priceType === "negotiable"
          ? "negotiable"
          : nextAmount > 0
          ? "paid"
          : "free";

      return { ...prev, priceAmount: nextAmount, priceType: nextType };
    });

    if (errors.price_amount) {
      setErrors((prev) => ({ ...prev, price_amount: "" }));
    }
  };

  const handlePriceTypeChange = (type: "free" | "paid" | "negotiable") => {
    setFormData((prev) => {
      // 자식에서 협의 버튼만 토글하므로 type==="negotiable" 만 들어온다고 가정
      if (type === "negotiable") {
        const turningOff = prev.priceType === "negotiable";
        if (turningOff) {
          const amt = prev.priceAmount ?? 0;
          return { ...prev, priceType: amt > 0 ? "paid" : "free" };
        }
        return { ...prev, priceType: "negotiable" };
      }

      const amt = prev.priceAmount ?? 0;
      return { ...prev, priceType: amt > 0 ? "paid" : "free" };
    });
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
      priceType: formData.priceAmount ? "paid" : formData.priceType!,
      priceAmount: formData.priceAmount,
      date: formData.date!, // Date
    };

    const posting = await createPosting(payload);
    setSuccessPostingId(posting.id);
    setIsSuccessOpen(true);
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
              onPriceTypeChange={handlePriceTypeChange}
              onPriceAmountChange={handlePriceAmountChange}
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
          nextDisabled={isPending}
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
