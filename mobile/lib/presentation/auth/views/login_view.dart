import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/common/theme/app_size.dart';
import 'package:flutter_template/common/utils/toast_util.dart';
import 'package:flutter_template/data/dtos/auth/login_by_phone_request_dto.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';
import 'package:flutter_template/di/di.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/auth/bloc/auth_patient/auth_patient_bloc.dart';
import 'package:flutter_template/presentation/auth/bloc/login/login_bloc.dart';
import 'package:flutter_template/presentation/auth/widgets/login_patient_form.dart';
import 'package:flutter_template/presentation/widgets/common_rounded_button.dart';
import 'package:flutter_template/presentation/widgets/header.dart';
import 'package:flutter_template/router/app_router.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => LoginBloc(
        authPatientBloc: context.read<AuthPatientBloc>(),
        patientRepository: getIt.get<PatientRepository>(),
      ),
      child: BlocListener<LoginBloc, LoginState>(
        listener: _listenLoginStateChanged,
        child: _LoginView(),
      ),
    );
  }

  void _listenLoginStateChanged(BuildContext context, LoginState state) {
    if (state is LoginNotSuccess) {
      ToastUtil.showError(text: state.error, context);
    }
  }
}

class _LoginView extends StatelessWidget {
  _LoginView();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _phoneEditController = TextEditingController();
  final TextEditingController _passwordEditController = TextEditingController();

  void _submitLogin(BuildContext context) {
    if (_formKey.currentState!.validate()) {
      context.read<LoginBloc>().add(
            LoginSubmitEvent(
              LoginByPhoneRequestDTO(
                phone: _phoneEditController.text,
                password: _passwordEditController.text,
              ),
            ),
          );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Column(
          children: [
            Header(
              heading1: LocaleKeys.auth_sign_in.tr(),
              heading2: LocaleKeys.auth_sign_in_require.tr(),
            ),
            Center(
              child: SingleChildScrollView(
                child: Container(
                  margin: const EdgeInsets.symmetric(
                    horizontal: AppSize.horizontalSpacing,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      LoginPatientForm(
                        formKey: _formKey,
                        phoneEditController: _phoneEditController,
                        passwordEditController: _passwordEditController,
                      ),
                      const SizedBox(height: 20),
                      BlocBuilder<LoginBloc, LoginState>(
                        builder: (context, state) {
                          return CommonRoundedButton(
                            onPressed: () => _submitLogin(context),
                            isLoading: state is LoginLoading,
                            content: LocaleKeys.auth_sign_in.tr(),
                            width: double.infinity,
                            backgroundColor:
                                context.themeConfig.customButtonBackground,
                            textStyle: context.labelLarge.copyWith(
                              fontWeight: FontWeight.w700,
                              color: context.themeConfig.textWhiteColor,
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(LocaleKeys.auth_not_account.tr()),
                          TextButton(
                            child: Text(
                              LocaleKeys.auth_sign_up.tr(),
                              style: context.labelLarge.copyWith(
                                fontWeight: FontWeight.w700,
                                color: context.themeConfig.primaryColor,
                              ),
                            ),
                            onPressed: () {
                              Navigator.of(context)
                                  .pushNamed(AppRouter.register);
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
