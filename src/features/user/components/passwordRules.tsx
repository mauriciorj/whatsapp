import { Check } from "lucide-react";

const PasswordRules = ({
  passwordValidation: { rule1, rule2, rule3, rule4, rule5 },
}: {
  passwordValidation: {
    rule1: boolean;
    rule2: boolean;
    rule3: boolean;
    rule4: boolean;
    rule5: boolean;
  };
}) => {
  return (
    <div className="pb-3 px-3">
      <div className="mb-2 text-sm font-medium">Regras para senha</div>
      <div>
        <ul>
          <li
            className={`ml-1 flex items-center text-sm font-medium ${
              rule1 ? "text-gray line-through" : ""
            }`}
          >
            <div className="mr-1 w-[20px]">{rule1 ? <Check /> : null}</div>
            Deve ter entre 8 e 20 caracteres
          </li>
          <li
            className={`ml-1 flex items-center text-sm font-medium ${
              rule2 ? "text-gray line-through" : ""
            }`}
          >
            <div className="mr-1 w-[20px]">{rule2 ? <Check /> : null}</div>
            Pelo menos uma letra minúscula
          </li>
          <li
            className={`ml-1 flex items-center text-sm font-medium ${
              rule3 ? "text-gray line-through" : ""
            }`}
          >
            <div className="mr-1 w-[20px]">{rule3 ? <Check /> : null}</div>
            Pelo menos uma letra maiúscula
          </li>
          <li
            className={`ml-1 flex items-center text-sm font-medium ${
              rule4 ? "text-gray line-through" : ""
            }`}
          >
            <div className="mr-1 w-[20px]">{rule4 ? <Check /> : null}</div>
            Pelo menos um número
          </li>
          <li
            className={`ml-1 flex items-center text-sm font-medium ${
              rule5 ? "text-gray line-through" : ""
            }`}
          >
            <div className="mr-1 w-[20px]">{rule5 ? <Check /> : null}</div>
            Pelo menos um caracter especial - !@#$%^&*?
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordRules;
