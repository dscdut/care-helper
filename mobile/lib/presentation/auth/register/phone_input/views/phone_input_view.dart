import 'package:flutter/material.dart';

import 'package:flutter_template/presentation/widgets/custom_button.dart';
import 'package:flutter_template/presentation/widgets/header.dart';
import 'package:flutter_template/presentation/auth/register/pin_authen/pin_authen.dart';

class PhoneInputView extends StatefulWidget {
  const PhoneInputView({super.key});

  @override
  State<PhoneInputView> createState() => _PhoneInputViewState();
}

class _PhoneInputViewState extends State<PhoneInputView> {
  bool _validate = false;

  _onSubmitPhone(BuildContext context) {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) {
          return const PinAuthenView();
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const Header(
            heading1: 'Nhap so dien thoai',
            heading2: 'Moi nhap so dien thoai tai o duoi',
          ),
          Form(
            child: Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.grey[300]!,
                  width: 1.0,
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: TextFormField(
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
            child: CustomButton(
              label: 'Tiep tuc',
              onPressed: () => _onSubmitPhone(context),
            ),
          ),
        ],
      ),
    );
  }
}
