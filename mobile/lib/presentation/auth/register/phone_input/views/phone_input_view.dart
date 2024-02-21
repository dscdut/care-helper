import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/helpers/dio_helper.dart';
import 'package:flutter_template/data/datasources/patient/patient_datasource.dart';
import 'package:flutter_template/data/datasources/patient/remote/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/get_token_by_phone_request_dto.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/bloc/register/register_bloc.dart';

import 'package:flutter_template/presentation/widgets/custom_button.dart';
import 'package:flutter_template/presentation/widgets/header.dart';
import 'package:flutter_template/presentation/auth/register/pin_authen/pin_authen.dart';

class PhoneInputView extends StatefulWidget {
  const PhoneInputView({super.key});

  @override
  State<PhoneInputView> createState() => _PhoneInputViewState();
}

class _PhoneInputViewState extends State<PhoneInputView> {
  PatientRepository patientRepository = PatientRepository(
    dataSource: PatientDataSource(
      remoteDataSource: PatientRemoteDataSource(
        dioHelper: DioHelper(dio: Dio()),
      ),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => RegisterBloc(
        patientRepository: patientRepository,
      ),
      child: const MyView(),
    );
  }
}

class MyView extends StatefulWidget {
  const MyView({super.key});
  @override
  State<MyView> createState() => _MyViewState();
}

class _MyViewState extends State<MyView> {
  final TextEditingController _phoneController = TextEditingController();

  String? _validatePhoneNumber(String? value) {
    if (value == null || value.isEmpty) {
      return LocaleKeys.auth_phone_required.tr();
    } else if (value.length != 10) {
      return LocaleKeys.auth_phone_check.tr();
    }
    return null;
  }

  _onSubmitPhone(BuildContext context) {
    context.read<RegisterBloc>().add(
          SubmitPhoneNumberEvent(
            GetTokenByPhoneRequestDTO(phone: _phoneController.text),
          ),
        );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocListener<RegisterBloc, RegisterState>(
        listener: (context, state) {
          if (state.token.isNotEmpty) {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => BlocProvider.value(
                  value: BlocProvider.of<RegisterBloc>(context),
                  child: PinAuthenView(phoneNumber: _phoneController.text),
                ),
              ),
            );
          }
        },
        child: Column(
          children: [
            Header(
              heading1: LocaleKeys.auth_enter_phone.tr(),
              heading2: LocaleKeys.auth_enter_phone_detail.tr(),
            ),
            Form(
              autovalidateMode: AutovalidateMode.onUserInteraction,
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
                    label: Text(LocaleKeys.auth_phone_number.tr()),
                    hintStyle: TextStyle(color: Colors.grey[400]),
                    contentPadding: const EdgeInsets.all(12),
                    border: InputBorder.none,
                  ),
                  keyboardType: TextInputType.phone,
                  validator: _validatePhoneNumber,
                ),
              ),
            ),
            const SizedBox(height: 28),
            Container(
              margin: const EdgeInsets.only(left: 16, right: 16),
              child: CustomButton(
                label: LocaleKeys.action_continue.tr(),
                onPressed: () => _onSubmitPhone(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
