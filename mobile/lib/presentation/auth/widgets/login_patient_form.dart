import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/common/utils/validator_util.dart';
import 'package:flutter_template/presentation/widgets/common_text_form_field.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/bloc/login/login_bloc.dart';

class LoginPatientForm extends StatefulWidget {
  const LoginPatientForm({
    super.key,
    required this.formKey,
    required this.phoneEditController,
    required this.passwordEditController,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController phoneEditController;
  final TextEditingController passwordEditController;

  @override
  State<LoginPatientForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginPatientForm> {
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: widget.formKey,
      child: Column(
        children: [
          const SizedBox(height: 20),
          CommonTextFormField(
            validator: ValidatorUtil.validatePhoneNumber,
            textController: widget.phoneEditController,
            labelText: LocaleKeys.auth_phone_number.tr(),
            keyboardType: TextInputType.phone,
            hintText: '0123456789',
          ),
          const SizedBox(height: 15),
          BlocBuilder<LoginBloc, LoginState>(
            builder: (context, state) {
              return CommonTextFormField(
                textController: widget.passwordEditController,
                labelText: LocaleKeys.texts_password.tr(),
                keyboardType: TextInputType.text,
                errorText: state.error,
                hintText: '••••••••',
                suffixIcon:
                    _isObscure ? Icons.visibility_off : Icons.visibility,
                onTapSuffixIcon: () {
                  setState(() {
                    _isObscure = !_isObscure;
                  });
                },
                isObscure: _isObscure,
                onChanged: (value) {},
              );
            },
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                onPressed: () {},
                child: Text(
                  LocaleKeys.auth_forgot_password.tr(),
                  style: context.labelMedium.copyWith(
                    color: Theme.of(context).primaryColor,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
