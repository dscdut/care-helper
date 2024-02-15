import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/views/pin_authen_view.dart';
import 'package:flutter_template/presentation/auth/widgets/custom_button_widget.dart';
import 'package:flutter_template/presentation/auth/widgets/header_phone_input_widget.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  bool _validate = false;
  final TextEditingController _phoneController = TextEditingController();

  _onTapForgotPassword() {
    if (_phoneController.text.isEmpty) {
      setState(() {
        _validate = true;
      });
    } else if (_phoneController.text.length == 10) {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => const PinAuthenView(
            phoneNumber: '2222',
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          HeaderPhoneInputWidget(
            heading1: LocaleKeys.auth_sign_in.tr(),
            heading2:
                LocaleKeys.auth_please_enter_phone_number_and_password.tr(),
          ),
          Form(
            child: Container(
              margin: const EdgeInsets.all(16),
              child: Column(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.grey[300]!,
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: TextFormField(
                      controller: _phoneController,
                      decoration: InputDecoration(
                        label: Text(LocaleKeys.auth_phone_number.tr()),
                        hintStyle: TextStyle(color: Colors.grey[400]),
                        contentPadding: const EdgeInsets.all(12),
                        border: InputBorder.none,
                        errorText: _validate
                            ? LocaleKeys.auth_must_enter_10_digits.tr()
                            : null,
                      ),
                      keyboardType: TextInputType.phone,
                      onChanged: (value) {
                        setState(() {
                          _validate = value.length != 10;
                        });
                      },
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.grey[300]!,
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: TextFormField(
                      obscureText: true,
                      decoration: InputDecoration(
                        label: Text(LocaleKeys.texts_password.tr()),
                        hintStyle: TextStyle(color: Colors.grey[400]),
                        contentPadding: const EdgeInsets.all(12),
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () => _onTapForgotPassword(),
                        child: Text(
                          LocaleKeys.texts_forgot_password.tr(),
                          style: const TextStyle(color: ColorStyles.blue700),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 28),
          Container(
            margin: const EdgeInsets.only(left: 16, right: 16),
            child: CustomButtonWidget(
              label: LocaleKeys.auth_sign_in.tr(),
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }
}
