import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
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
import 'package:flutter_template/router/app_router.dart';

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
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController =
      TextEditingController();

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return LocaleKeys.auth_password_required.tr();
    } else if (value.length < 8) {
      return LocaleKeys.auth_password_recommnend.tr();
    }
    return null;
  }

  String? _validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return LocaleKeys.auth_password_required.tr();
    } else if (value != _passwordController.text) {
      return LocaleKeys.auth_password_not_match.tr();
    }
    return null;
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
            Navigator.of(context).pushReplacementNamed(AppRouter.login);
          } else if (state.error.isNotEmpty) {
            ToastUtil.showError(
              context,
              text: state.error,
              position: ToastPosition.BOTTOM,
            );
          }
        },
        child: Column(
          children: [
            Header(
              heading1: LocaleKeys.auth_new_password.tr(),
              heading2: LocaleKeys.auth_easy_remember_password.tr(),
            ),
            Form(
              autovalidateMode: AutovalidateMode.onUserInteraction,
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
                        hintStyle:
                            TextStyle(color: context.themeConfig.hintColor),
                        contentPadding: const EdgeInsets.all(8),
                        border: InputBorder.none,
                      ),
                      keyboardType: TextInputType.visiblePassword,
                      validator: _validatePassword,
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
                      decoration: InputDecoration(
                        label: Text(LocaleKeys.auth_confirm_password.tr()),
                        hintStyle:
                            TextStyle(color: context.themeConfig.hintColor),
                        contentPadding: const EdgeInsets.all(8),
                        border: InputBorder.none,
                      ),
                      keyboardType: TextInputType.visiblePassword,
                      validator: _validateConfirmPassword,
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
