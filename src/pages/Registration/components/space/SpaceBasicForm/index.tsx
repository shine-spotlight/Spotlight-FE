import { useRegistrationDraftStore } from "@stores/registrationStore";
import { SPACE_STEP } from "@pages/Registration/types/steps";
import type { SpaceBusinessPayload } from "@pages/Registration/types/payloads";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export function SpaceBusinessForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const update = useRegistrationDraftStore((s) => s.updateCurrentStepData);
  const next = useRegistrationDraftStore((s) => s.nextStep);
  const nav = useNavigate();

  const initial = (draft?.role === "space" &&
    draft.data[SPACE_STEP.Business]) as SpaceBusinessPayload | undefined;

  const [form, setForm] = useState<SpaceBusinessPayload>({
    businessNumber: initial?.businessNumber ?? 0,
  });

  const onSubmit = useCallback(async () => {
    update(form);
    await fetch("/api/registration/space/business", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    next();
    nav("/register", { replace: true });
  }, [form, update, next, nav]);

  return (
    <div>
      <h2>사업자 정보</h2>
      {/* 폼 UI 구성 */}
      <button onClick={onSubmit}>다음</button>
    </div>
  );
}
