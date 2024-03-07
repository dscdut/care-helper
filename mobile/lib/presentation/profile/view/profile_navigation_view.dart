import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/extensions/context_extension.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';
import 'package:flutter_template/router/app_router.dart';

class ProfileNavigationView extends StatefulWidget {
  const ProfileNavigationView({super.key});

  @override
  State<ProfileNavigationView> createState() => _ProfileNavigationViewState();
}

class _ProfileNavigationViewState extends State<ProfileNavigationView> {
  Widget customedWidget = Text(
    LocaleKeys.profile_administrative_medical.tr(),
    style: const TextStyle(
      color: Colors.white,
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              context.themeConfig.primaryColor,
              context.themeConfig.secondaryColor,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          children: [
            Expanded(
              child: Container(
                margin: const EdgeInsets.all(16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    CustomButton(
                      text: LocaleKeys.profile_medical_record.tr(),
                      width: double.infinity,
                      height: 150,
                      textSize: 20,
                      color: context.themeConfig.darkColorButton,
                      onPressed: () {},
                    ),
                    const SizedBox(height: 16),
                    CustomButton(
                      widget: customedWidget,
                      width: double.infinity,
                      height: 150,
                      color: context.themeConfig.darkColorButton,
                      onPressed: () {
                        setState(() {
                          customedWidget = Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              CustomButton(
                                text: LocaleKeys.profile_adminis_medical_view
                                    .tr(),
                                width: double.infinity,
                                height: 50,
                                textSize: 16,
                                color: context.themeConfig.categoryButtonColor,
                                onPressed: () {
                                  Navigator.of(context)
                                      .pushNamed(AppRouter.profileDetail);
                                },
                              ),
                              const SizedBox(height: 16),
                              CustomButton(
                                text: LocaleKeys.profile_adminis_medical_edit
                                    .tr(),
                                width: double.infinity,
                                height: 50,
                                textSize: 16,
                                color: context.themeConfig.categoryButtonColor,
                                onPressed: () {
                                  Navigator.of(context)
                                      .pushNamed(AppRouter.profileDetail);
                                },
                              ),
                            ],
                          );
                        });
                      },
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Container(
                    margin: const EdgeInsets.all(16),
                    child: CustomButton(
                      text: LocaleKeys.action_back_to_home.tr(),
                      width: double.infinity,
                      height: 50,
                      textSize: 16,
                      color: context.themeConfig.darkColorButton,
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ),
                  const SizedBox(height: 30),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
