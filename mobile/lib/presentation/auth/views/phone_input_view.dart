import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/auth/views/pin_authen_view.dart';
import 'package:flutter_template/presentation/auth/widgets/custom_button_widget.dart';
import 'package:flutter_template/presentation/auth/widgets/header_phone_input_widget.dart';

class RegisterPhoneInput extends StatefulWidget {
  const RegisterPhoneInput({
    super.key,
  });
  @override
  State<RegisterPhoneInput> createState() => _RegisterPhoneInputState();
}

class _RegisterPhoneInputState extends State<RegisterPhoneInput> {
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
            heading1: 'Nhập số điện thoại',
            heading2: 'Mời nhập số điện thoại ở dưới',
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
          ),
          const SizedBox(height: 28),
          Container(
            margin: const EdgeInsets.only(left: 16, right: 16),
            child: CustomButtonWidget(
              label: 'Tiep tuc',
              onPressed: () => _onSubmitPhone(context),
              // onPressed: () => {},
            ),
          ),
        ],
      ),
    );
  }
}
