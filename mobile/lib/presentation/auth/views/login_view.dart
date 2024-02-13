import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/presentation/auth/views/pin_authen_view.dart';
import 'package:flutter_template/presentation/auth/widgets/custom_button_widget.dart';
import 'package:flutter_template/presentation/auth/widgets/header_phone_input_widget.dart';
import 'package:flutter_template/router/app_router.dart';

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
          const HeaderPhoneInputWidget(
            heading1: 'Dang nhap',
            heading2: 'Nhap so dien thoai va mat khau',
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
                        label: const Text('So dien thoai'),
                        hintStyle: TextStyle(color: Colors.grey[400]),
                        contentPadding: const EdgeInsets.all(12),
                        border: InputBorder.none,
                        errorText: _validate ? 'Phai nhap du 10 so' : null,
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
                        label: const Text('Mat khau'),
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
                          'Quen mat khau?',
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
              label: 'Dang nhap',
              onPressed: () {
                Navigator.of(context).pushNamed(AppRouter.profile);
              },
            ),
          ),
        ],
      ),
    );
  }
}
