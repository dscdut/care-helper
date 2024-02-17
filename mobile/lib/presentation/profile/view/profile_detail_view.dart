import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/administrative/view/administrative_view.dart';
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
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              ColorStyles.primaryColor,
              ColorStyles.secondaryColor,
            ],
          ),
        ),
        child: Column(
          children: [
            Expanded(
              child: Positioned(
                top: 20,
                child: ListView(
                  children: [
                    CupertinoSegmentedControl<int>(
                      //padding: const EdgeInsets.all(16),
                      selectedColor: ColorStyles.categoryButtonColor,
                      unselectedColor: Colors.white,
                      borderColor: Colors.transparent,
                      groupValue: selectedView,
                      children: {
                        0: CustomCategory(
                          text: LocaleKeys.profile_adminis.tr(),
                          fontSize: 16,
                        ),
                        1: CustomCategory(
                          text: LocaleKeys.profile_medical.tr(),
                          fontSize: 16,
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
            ),
            const Expanded(
              child: SingleChildScrollView(
                child: AdministrativeView(),
              ),
            ),
            Expanded(
              child: Positioned(
                bottom: 20,
                child: Column(
                  children: [
                    CustomButton(
                      text: LocaleKeys.action_back_to_home.tr(),
                      width: double.infinity,
                      height: 50,
                      textSize: 16,
                    ),
                    CustomButton(
                      text: LocaleKeys.action_save.tr(),
                      width: double.infinity,
                      height: 50,
                      textSize: 16,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
