import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/common/utils/toast_util.dart';
import 'package:flutter_template/data/dtos/profile/update_patient_request_dto.dart';
import 'package:flutter_template/data/repositories/patient_repository.dart';
import 'package:flutter_template/di/di.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/widgets/profile_textformfield.dart';
import 'package:flutter_template/presentation/profile/bloc/profile_bloc.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';

class AdministrativeView extends StatelessWidget {
  const AdministrativeView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ProfileBloc(
        patientRepository: getIt.get<PatientRepository>(),
      ),
      child: BlocListener<ProfileBloc, ProfileState>(
        listener: _listenProfileStateChanged,
        child: MyView(),
      ),
    );
  }

  void _listenProfileStateChanged(BuildContext context, ProfileState state) {
    if (state.error.isNotEmpty) {
      ToastUtil.showError(context, text: state.error);
    }
  }
}

class MyView extends StatelessWidget {
  MyView({super.key});

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final dobController = TextEditingController();
  final genderController = TextEditingController();
  final citizenIdController = TextEditingController();
  final insuranceIdController = TextEditingController();
  final addressController = TextEditingController();
  final occupationController = TextEditingController();
  final heightController = TextEditingController();
  final weightController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ProfileBloc, ProfileState>(
      builder: (context, state) {
        if (state.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }
        return SizedBox(
          height: 750,
          child: Form(
            key: formKey,
            child: Column(
              children: [
                ProfileTextFormField(
                  labelText:
                      state.patient?.fullName ?? LocaleKeys.profile_name.tr(),
                  hintText: LocaleKeys.profile_name_guiding.tr(),
                  controller: nameController,
                ),
                Row(
                  children: [
                    Expanded(
                      child: ProfileTextFormField(
                        labelText: state.patient?.birthday.toString() ??
                            LocaleKeys.profile_dob.tr(),
                        hintText: LocaleKeys.profile_dob_guiding.tr(),
                        controller: dobController,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Expanded(
                      child: ProfileTextFormField(
                        labelText: state.patient?.gender ??
                            LocaleKeys.profile_gender.tr(),
                        hintText: LocaleKeys.profile_gender_guiding.tr(),
                        controller: genderController,
                      ),
                    ),
                  ],
                ),
                ProfileTextFormField(
                  labelText: state.patient?.nationalIdCard ??
                      LocaleKeys.profile_citizen_id.tr(),
                  hintText: LocaleKeys.profile_citizen_id_guiding.tr(),
                  controller: citizenIdController,
                ),
                ProfileTextFormField(
                  labelText: state.patient?.insurance ??
                      LocaleKeys.profile_insurance_id.tr(),
                  hintText: LocaleKeys.profile_insurance_id_guiding.tr(),
                  controller: insuranceIdController,
                ),
                ProfileTextFormField(
                  labelText:
                      state.patient?.address ?? LocaleKeys.profile_address.tr(),
                  hintText: LocaleKeys.profile_address_guiding.tr(),
                  controller: addressController,
                ),
                ProfileTextFormField(
                  labelText: state.patient?.profesion ??
                      LocaleKeys.profile_occupation.tr(),
                  hintText: LocaleKeys.profile_occupation_guiding.tr(),
                  controller: occupationController,
                ),
                Row(
                  children: [
                    Expanded(
                      child: ProfileTextFormField(
                        labelText: state.patient?.height.toString() ??
                            LocaleKeys.profile_height.tr(),
                        hintText: LocaleKeys.profile_height_guiding.tr(),
                        controller: heightController,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Expanded(
                      child: ProfileTextFormField(
                        labelText: state.patient?.weight.toString() ??
                            LocaleKeys.profile_weight.tr(),
                        hintText: LocaleKeys.profile_weight_guiding.tr(),
                        controller: weightController,
                      ),
                    ),
                  ],
                ),
                ProfileTextFormField(
                  labelText: LocaleKeys.profile_check_up.tr(),
                  hintText: LocaleKeys.profile_check_up_guiding.tr(),
                ),
                Expanded(
                  child: Stack(
                    children: [
                      Positioned.fill(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            CustomButton(
                              text: LocaleKeys.action_save.tr(),
                              width: double.infinity,
                              height: 50,
                              textSize: 16,
                              color: context.themeConfig.categoryButtonColor,
                              onPressed: () {
                                context.read<ProfileBloc>().add(
                                      UpdatePatientInfoEvent(
                                        UpdatePatientRequestDTO(
                                          fullName: nameController.text == ''
                                              ? state.patient?.fullName
                                              : nameController.text,
                                          gender: genderController.text == ''
                                              ? state.patient?.gender
                                              : genderController.text,
                                          birthday: DateTime.parse(
                                            DateFormat('yyyy-MM-dd').format(
                                              DateTime.now(),
                                            ),
                                          ),
                                          address: addressController.text == ''
                                              ? state.patient?.address
                                              : addressController.text,
                                          nationalIdCard:
                                              citizenIdController.text == ''
                                                  ? state
                                                      .patient?.nationalIdCard
                                                  : citizenIdController.text,
                                          insurance:
                                              insuranceIdController.text == ''
                                                  ? state.patient?.insurance
                                                  : insuranceIdController.text,
                                          profesion:
                                              occupationController.text == ''
                                                  ? state.patient?.profesion
                                                  : occupationController.text,
                                          height: heightController.text == ''
                                              ? state.patient?.height
                                              : heightController.text,
                                          weight: weightController.text == ''
                                              ? state.patient?.weight
                                              : weightController.text,
                                        ),
                                      ),
                                    );
                              },
                            ),
                            const SizedBox(height: 8),
                            CustomButton(
                              text: LocaleKeys.action_back_to_home.tr(),
                              width: double.infinity,
                              height: 50,
                              textSize: 16,
                              color: context.themeConfig.categoryButtonColor,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
