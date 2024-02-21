import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/helpers/dio_helper.dart';
import 'package:flutter_template/data/datasources/patient/patient_datasource.dart';
import 'package:flutter_template/data/datasources/patient/remote/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/verify_otp_request_dto.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/bloc/register/register_bloc.dart';

import 'package:pinput/pinput.dart';

import 'package:flutter_template/presentation/widgets/custom_button.dart';
import 'package:flutter_template/presentation/widgets/header.dart';
import 'package:flutter_template/presentation/auth/register/new_password/new_password.dart';

class PinAuthenView extends StatefulWidget {
  const PinAuthenView({Key? key, required this.phoneNumber}) : super(key: key);

  final String phoneNumber;

  @override
  State<PinAuthenView> createState() => _PinAuthenViewState();
}

class _PinAuthenViewState extends State<PinAuthenView> {
  PatientRepository patientRepository = PatientRepository(
    dataSource: PatientDataSource(
      remoteDataSource: PatientRemoteDataSource(
        dioHelper: DioHelper(dio: Dio()),
      ),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return MyView(phoneNumber: widget.phoneNumber);
  }
}

class MyView extends StatefulWidget {
  const MyView({Key? key, required this.phoneNumber}) : super(key: key);

  final String phoneNumber;

  @override
  State<MyView> createState() => _MyViewState();
}

class _MyViewState extends State<MyView> {
  static const Color _accent = Color(0xff112950);
  final pinController = TextEditingController();
  final focusNode = FocusNode();
  final formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    pinController.dispose();
    focusNode.dispose();
    super.dispose();
  }

  _handleCorrectPin(BuildContext context, String token) {
    context.read<RegisterBloc>().add(
          VerifyOtpEvent(
            VerifyOtpRequestDTO(
              token: token,
              otp: pinController.text,
            ),
          ),
        );
  }

  @override
  Widget build(BuildContext context) {
    const focusedBorderColor = Color.fromRGBO(21, 101, 192, 1);
    const fillColor = Color.fromRGBO(243, 246, 249, 0);
    const borderColor = _accent;

    final defaultPinTheme = PinTheme(
      width: 48,
      height: 48,
      textStyle: const TextStyle(
        fontSize: 22,
        color: Color.fromRGBO(30, 60, 87, 1),
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: borderColor),
      ),
    );

    return Scaffold(
      body: BlocListener<RegisterBloc, RegisterState>(
        listener: (context, state) {
          if (state.token.isNotEmpty && state.error.isEmpty) {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => BlocProvider.value(
                  value: BlocProvider.of<RegisterBloc>(context),
                  child: const NewPasswordView(),
                ),
              ),
            );
          }
        },
        child: Column(
          children: [
            Header(
              heading1: LocaleKeys.auth_auth.tr(),
              heading2: LocaleKeys.auth_auth_detail.tr() + widget.phoneNumber,
            ),
            const SizedBox(height: 24),
            Form(
              key: formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Pinput(
                    length: 6,
                    controller: pinController,
                    focusNode: focusNode,
                    defaultPinTheme: defaultPinTheme,
                    separatorBuilder: (index) => const SizedBox(width: 8),
                    validator: (value) {
                      return value == '000000'
                          ? null
                          : LocaleKeys.auth_wrong_pin.tr();
                    },
                    onCompleted: (pin) {
                      debugPrint('onCompleted: $pin');
                    },
                    onChanged: (value) {
                      debugPrint('onChanged: $value');
                    },
                    cursor: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Container(
                          margin: const EdgeInsets.only(bottom: 9),
                          width: 22,
                          height: 1,
                          color: focusedBorderColor,
                        ),
                      ],
                    ),
                    focusedPinTheme: defaultPinTheme.copyWith(
                      height: 52,
                      width: 52,
                      decoration: defaultPinTheme.decoration!.copyWith(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: focusedBorderColor),
                      ),
                    ),
                    submittedPinTheme: defaultPinTheme.copyWith(
                      decoration: defaultPinTheme.decoration!.copyWith(
                        color: fillColor,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    errorPinTheme: defaultPinTheme.copyBorderWith(
                      border: Border.all(color: Colors.redAccent),
                    ),
                  ),
                  const SizedBox(height: 120),
                  Container(
                    margin: const EdgeInsets.only(left: 16, right: 16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              LocaleKeys.auth_not_receive_code.tr(),
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            Text(LocaleKeys.auth_send_pin_again.tr()),
                          ],
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue[800],
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                            minimumSize: const Size(0, 40),
                          ),
                          onPressed: () {},
                          child: Text(
                            LocaleKeys.auth_resend.tr(),
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),
                  Container(
                    margin: const EdgeInsets.only(left: 16, right: 16),
                    child: CustomButton(
                      label: LocaleKeys.action_continue.tr(),
                      onPressed: () {
                        focusNode.unfocus();
                        formKey.currentState!.validate()
                            ? _handleCorrectPin(
                                context,
                                context.read<RegisterBloc>().state.token,
                              )
                            : null;
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
