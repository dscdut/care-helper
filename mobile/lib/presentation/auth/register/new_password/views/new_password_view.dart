import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/helpers/dio_helper.dart';
import 'package:flutter_template/common/utils/toast_util.dart';
import 'package:flutter_template/data/datasources/patient/patient_datasource.dart';
import 'package:flutter_template/data/datasources/patient/remote/patient_datasource.dart';
import 'package:flutter_template/data/dtos/auth/register_patient_request_dto.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/bloc/register/register_bloc.dart';
import 'package:flutter_template/presentation/widgets/custom_button.dart';
import 'package:flutter_template/presentation/widgets/header.dart';

class NewPasswordView extends StatefulWidget {
  const NewPasswordView({super.key});

  @override
  State<NewPasswordView> createState() => _NewPasswordViewState();
}

class _NewPasswordViewState extends State<NewPasswordView> {
  PatientRepository patientRepository = PatientRepository(
    dataSource: PatientDataSource(
      remoteDataSource: PatientRemoteDataSource(
        dioHelper: DioHelper(dio: Dio()),
      ),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return const MyView();
  }
}

class MyView extends StatefulWidget {
  const MyView({super.key});

  @override
  State<MyView> createState() => _MyViewState();
}

class _MyViewState extends State<MyView> {
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

  _onPatientRegister(BuildContext context, String token) {
    context.read<RegisterBloc>().add(
          RegisterPatientEvent(
            RegisterPatientRequestDTO(
              token: token,
              password: _passwordController.text,
            ),
          ),
        );
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
      body: BlocListener<RegisterBloc, RegisterState>(
        listener: (context, state) {
          if (state.isRegistered) {
            const ToastCard(
              duration: Duration(seconds: 3),
              position: ToastPosition.TOP,
              child: Text('register successfully'),
            );
          } else if (state.error.isNotEmpty) {
            log('error: ${state.error}');
          }
        },
        child: Column(
          children: [
            Header(
              heading1: LocaleKeys.auth_new_password.tr(),
              heading2: LocaleKeys.auth_easy_remember_password.tr(),
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
                        label: Text(LocaleKeys.auth_password.tr()),
                        hintStyle: TextStyle(color: Colors.grey[400]),
                        contentPadding: const EdgeInsets.all(8),
                        border: InputBorder.none,
                        errorText: _validate
                            ? LocaleKeys.auth_password_recommnend.tr()
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
                        label: Text(LocaleKeys.auth_confirm_password.tr()),
                        hintStyle: TextStyle(color: Colors.grey[400]),
                        contentPadding: const EdgeInsets.all(8),
                        border: InputBorder.none,
                        errorText: isMatch
                            ? null
                            : LocaleKeys.auth_password_not_match.tr(),
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
              child: CustomButton(
                label: LocaleKeys.action_continue.tr(),
                onPressed: () => _onPatientRegister(
                  context,
                  context.read<RegisterBloc>().state.token,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
