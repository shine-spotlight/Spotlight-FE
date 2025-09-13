import { ArrowIcon } from "@assets/svg/common";
import * as S from "./index.styles";

export type MenuItem = {
  id: string;
  label: string;
  onClick?: () => void;
};

export const MenuList: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  return (
    <div>
      {items.map((m) => (
        <S.MenuItem key={m.id} onClick={m.onClick}>
          {m.label}
          <ArrowIcon style={{ transform: "rotate(180deg)" }} height={24} />
        </S.MenuItem>
      ))}
    </div>
  );
};
