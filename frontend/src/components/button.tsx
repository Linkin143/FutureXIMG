import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Button = styled.div<{
  isDisabled?: boolean;
  isLoading?: boolean;
  flex?: boolean;
  type?: "primary" | "secondary";
}>`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  // height: min-content;
  padding: 10px 24px;
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `
  background: ${theme.secondary};
  `
      : `
  background: ${theme.primary};
`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.4;
  cursor: not-allowed;

  `}
  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}
${({ flex }) =>
    flex &&
    `
    flex: 1;
`}
`;

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  type?: "primary" | "secondary";
  onClick: () => void;
  flex?: boolean;
}

const button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  isDisabled = false,
  rightIcon,
  leftIcon,
  type = "primary",
  onClick,
  flex,
}) => {
  return (
    <Button
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default button;