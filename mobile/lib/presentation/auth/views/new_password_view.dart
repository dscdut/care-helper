import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/auth/widgets/custom_button_widget.dart';
import 'package:flutter_template/presentation/auth/widgets/header_phone_input_widget.dart';
import 'package:flutter_template/router/app_router.dart';

class NewPasswordView extends StatefulWidget {
  const NewPasswordView({Key? key}) : super(key: key);

  @override
  State<NewPasswordView> createState() => _NewPasswordScreenState();
}

class _NewPasswordScreenState extends State<NewPasswordView> {
  bool _validate = false;
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();
  bool isMatch = true;

  @override
  void initState() {
    super.initState();
    _passwordController.addListener(_checkPasswordMatch);
  }

  _checkPasswordMatch() {
    setState(() {
      isMatch = _passwordController.text == _confirmPasswordController.text;
    });
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const HeaderPhoneInputWidget(
            heading1: 'Create New Password',
            heading2: 'Enter a password to remember',
          ),
          Form(
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.grey[300]!,
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: TextFormField(
                    controller: _passwordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Password',
                      hintStyle: TextStyle(color: Colors.grey[400]),
                      contentPadding: const EdgeInsets.all(8),
                      border: InputBorder.none,
                      errorText: _validate
                          ? 'Password should be at least 8 characters long'
                          : null,
                    ),
                    keyboardType: TextInputType.visiblePassword,
                    onChanged: (value) {
                      setState(() {
                        _validate = value.length < 8;
                      });
                    },
                  ),
                ),
                Container(
                  margin: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.grey[300]!,
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: TextFormField(
                    controller: _confirmPasswordController,
                    obscureText: true,
                    onChanged: (_) => _checkPasswordMatch(),
                    decoration: InputDecoration(
                      labelText: 'Confirm Password',
                      hintStyle: TextStyle(color: Colors.grey[400]),
                      contentPadding: const EdgeInsets.all(8),
                      border: InputBorder.none,
                      errorText: isMatch ? null : 'Passwords do not match',
                    ),
                    keyboardType: TextInputType.visiblePassword,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Container(
            margin: const EdgeInsets.only(left: 16, right: 16),
            child: CustomButtonWidget(
              label: 'Continue',
              onPressed: () {
                Navigator.of(context).pushNamedAndRemoveUntil(
                  AppRouter.login,
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
