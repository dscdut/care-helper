import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/constants/endpoints.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/views/pin_authen_view.dart';
import 'package:flutter_template/presentation/auth/widgets/custom_button_widget.dart';
import 'package:flutter_template/presentation/auth/widgets/header_phone_input_widget.dart';
import 'package:flutter_template/router/app_router.dart';
import 'package:hive/hive.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  bool _validate = false;
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final focusNode = FocusNode();
  final formKey = GlobalKey<FormState>();
  final dio = Dio();

  @override
  void dispose() {
    phoneController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  Future<void> _loginPatient() async {
    try {
      // final loginBox = await Hive.openBox('loginBox');
      // final token = loginBox.get('token');
      final response = await dio.post(
        Endpoints.login,
        data: {
          'phone': phoneController.text,
          'password': passwordController.text,
        },
      );
      print(response.data);
      print('Login success');
      // print('Token: $token');
    } catch (e) {
      print('error: $e');
    }
  }

  _onTapForgotPassword() {
    if (phoneController.text.isEmpty) {
      setState(() {
        _validate = true;
      });
    } else if (phoneController.text.length == 10) {
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
          const HeaderPhoneInputWidget(
            heading1: 'Sign In',
            heading2: 'Enter your phone number and password to sign in',
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
                      controller: phoneController,
                      decoration: InputDecoration(
                        label: const Text('Phone number'),
                        hintStyle: TextStyle(color: Colors.grey[400]),
                        contentPadding: const EdgeInsets.all(12),
                        border: InputBorder.none,
                        errorText:
                            _validate ? 'Must enter at least 10 digits' : null,
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
                      controller: passwordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        label: const Text('Password'),
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
                        child: const Text(
                          'Forgot password?',
                          style: TextStyle(color: ColorStyles.blue700),
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
              label: 'Sign In',
              // onPressed: () => _loginPatient(),
              onPressed: () {
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  AppRouter.root,
                  (route) => false,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
