import { InputHTMLAttributes, FC, forwardRef } from "react";

export default forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function InputField(props: InputHTMLAttributes<HTMLInputElement>, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className="h-[57px] w-full rounded-[13px] border border-border bg-tertiary p-[21px] outline-0 focus:border-accent-darker"
    />
  );
});
