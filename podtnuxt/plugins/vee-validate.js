import {extend} from "vee-validate";
import {required, email} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "وارد کردن این فیلد اجباری است!!!"
});
extend("email", {
  ...email,
  message: "ایمیل مورد قبول نمی باشد."
});

