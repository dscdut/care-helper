import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/auth/views/pin_authen_view.dart';
import 'package:flutter_template/presentation/auth/widgets/custom_button_widget.dart';
import 'package:flutter_template/presentation/auth/widgets/header_phone_input_widget.dart';

class PhoneInputView extends StatefulWidget {
  const PhoneInputView({super.key});

  @override
  State<PhoneInputView> createState() => _PhoneInputViewState();
}

class _PhoneInputViewState extends State<PhoneInputView> {
  bool _validate = false;
  final TextEditingController _phoneController = TextEditingController();

  _onSubmitPhone(BuildContext context) {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) {
          return PinAuthenView(phoneNumber: _phoneController.text);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const HeaderPhoneInputWidget(
            heading1: 'Enter your phone number',
            heading2: 'Please enter your phone number below',
          ),
          Form(
            child: Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.grey[300]!,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: TextFormField(
                controller: _phoneController,
                decoration: InputDecoration(
                  label: const Text('Phone number'),
                  hintStyle: TextStyle(color: Colors.grey[400]),
                  contentPadding: const EdgeInsets.all(12),
                  border: InputBorder.none,
                  errorText: _validate ? 'Must enter at least 10 digits' : null,
                ),
                keyboardType: TextInputType.phone,
                onChanged: (value) {
                  setState(() {
                    _validate = value.length != 10;
                  });
                },
              ),
            ),
          ),
          const SizedBox(height: 28),
          Container(
            margin: const EdgeInsets.only(left: 16, right: 16),
            child: CustomButtonWidget(
              label: 'Continue',
              onPressed: () => _onSubmitPhone(context),
            ),
          ),
        ],
      ),
    );
  }
}
