import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';
import 'package:flutter_template/generated/locale_keys.g.dart';
import 'package:flutter_template/router/app_router.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});
  final Color _beginLinearColor = const Color(0xff112950);
  final Color _endLinearColor = const Color(0xff5D7EB2);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  _beginLinearColor,
                  _endLinearColor,
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(30),
                bottomRight: Radius.circular(30),
              ),
            ),
            height: MediaQuery.of(context).size.height * 0.65,
            child: Center(
              child: RichText(
                text: const TextSpan(
                  text: 'Care',
                  style: TextStyle(
                    color: Colors.white,
                    fontFamily: 'Roboto',
                    fontWeight: FontWeight.w400,
                    fontSize: 50,
                  ),
                  children: [
                    TextSpan(
                      text: 'Helper',
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: 'Roboto',
                        fontWeight: FontWeight.w700,
                        fontSize: 50,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 30),
          Container(
            margin: const EdgeInsets.only(left: 16, right: 16),
            child: Column(
              children: [
                OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    side: BorderSide(
                      color: Colors.blue[800]!,
                      width: 2,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  onPressed: () {
                    Navigator.of(context).pushNamed(AppRouter.register);
                  },
                  child: Container(
                    margin: const EdgeInsets.all(24),
                    width: double.infinity,
                    alignment: Alignment.center,
                    child: Text(
                      LocaleKeys.auth_sign_up.tr(),
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: ColorStyles.mineShaft,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 28),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue[800],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  onPressed: () {
                    Navigator.of(context).pushNamed(AppRouter.login);
                  },
                  child: Container(
                    margin: const EdgeInsets.all(24),
                    width: double.infinity,
                    alignment: Alignment.center,
                    child: Text(
                      LocaleKeys.auth_log_in.tr(),
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}