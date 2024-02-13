import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button.dart';
import 'package:flutter_template/presentation/profile/widgets/custom_button2.dart';
import 'package:flutter_template/router/app_router.dart';

class ProfileNav1View extends StatefulWidget {
  const ProfileNav1View({super.key});

  @override
  State<ProfileNav1View> createState() => _ProfileNav1ViewState();
}

class _ProfileNav1ViewState extends State<ProfileNav1View> {
  Widget customedWidget = const Text(
    'Hanh chinh va benh su',
    style: TextStyle(
      color: Colors.white,
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              ColorStyles.primaryColor,
              ColorStyles.secondaryColor,
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
                      text: 'Lich su lan kham',
                      width: double.infinity,
                      height: 150,
                      textSize: 20,
                      color: ColorStyles.darkColorButton,
                      onPressed: () {},
                    ),
                    const SizedBox(height: 16),
                    CustomButton2(
                      widget: customedWidget,
                      width: double.infinity,
                      height: 150,
                      color: ColorStyles.darkColorButton,
                      onPressed: () {
                        setState(() {
                          customedWidget = Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              CustomButton(
                                text: 'Xem hanh chinh va benh su',
                                width: double.infinity,
                                height: 50,
                                textSize: 16,
                                color: ColorStyles.categoryButtonColor,
                                onPressed: () {},
                              ),
                              const SizedBox(height: 16),
                              CustomButton(
                                text: 'Cap nhat hanh chinh va benh su',
                                width: double.infinity,
                                height: 50,
                                textSize: 16,
                                color: ColorStyles.categoryButtonColor,
                                onPressed: () {
                                  Navigator.of(context)
                                      .pushNamed(AppRouter.profile_detail);
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
                      text: 'Tro ve trang chu',
                      width: double.infinity,
                      height: 50,
                      textSize: 16,
                      color: ColorStyles.darkColorButton,
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ),
                  const SizedBox(height: 30),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
