import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/administrative/view/administrative_view.dart';
import 'package:flutter_template/presentation/profile/medical_history/view/medical_history_view.dart';
import 'package:flutter_template/presentation/profile/view/profile_view.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_category.dart';

class ProfileDetailView extends StatefulWidget {
  const ProfileDetailView({super.key});

  @override
  State<ProfileDetailView> createState() => _ProfileDetailViewState();
}

class _ProfileDetailViewState extends State<ProfileDetailView> {
  int selectedView = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // fix issue with keyboard and bottom overflow
      resizeToAvoidBottomInset: false,
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: context.themeConfig.background,
        ),
        child: Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Expanded(
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: ListView(
                        children: [
                          CupertinoSegmentedControl<int>(
                            //padding: const EdgeInsets.all(16),
                            selectedColor:
                                context.themeConfig.categoryButtonColor,
                            unselectedColor: Colors.white,
                            borderColor: Colors.transparent,
                            groupValue: selectedView,
                            children: {
                              0: CustomCategory(
                                text: LocaleKeys.profile_adminis.tr(),
                              ),
                              1: CustomCategory(
                                text: LocaleKeys.profile_medical.tr(),
                              ),
                            },
                            onValueChanged: (selectedView) {
                              setState(() {
                                this.selectedView = selectedView;
                              });
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                flex: 3,
                child: selectedView == 0
                    ? const SingleChildScrollView(
                        child: AdministrativeView(),
                      )
                    : const MedicalHistoryView(),
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
                          ),
                          const SizedBox(height: 8),
                          CustomButton(
                            text: LocaleKeys.action_back_to_home.tr(),
                            width: double.infinity,
                            height: 50,
                            textSize: 16,
                            onPressed: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (_) => const ProfilePage(),
                                ),
                              );
                            },
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
      ),
    );
  }
}
