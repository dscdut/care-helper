import 'package:flutter/material.dart';
import 'package:flutter_template/common/theme/color_styles.dart';

import 'package:flutter_template/presentation/auth/register/phone_input/phone_input.dart';

class GreetingView extends StatelessWidget {
  const GreetingView({super.key});

  onTapRegister(BuildContext context) {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (context) => const PhoneInputView()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  ColorStyles.primaryColor,
                  ColorStyles.secondaryColor,
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              borderRadius: BorderRadius.only(
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
                      fontSize: 40,
                    ),
                    children: [
                      TextSpan(
                        text: 'Helper',
                        style: TextStyle(
                          color: Colors.white,
                          fontFamily: 'Roboto',
                          fontWeight: FontWeight.bold,
                          fontSize: 40,
                        ),
                      ),
                    ]),
              ),
            ),
          ),
          const SizedBox(height: 40),
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
                  onPressed: () => onTapRegister(context),
                  child: Container(
                    margin: const EdgeInsets.all(24),
                    width: double.infinity,
                    alignment: Alignment.center,
                    child: const Text(
                      'Dang ky',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
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
                  onPressed: () {},
                  child: Container(
                    margin: const EdgeInsets.all(24),
                    width: double.infinity,
                    alignment: Alignment.center,
                    child: const Text(
                      'Dang nhap',
                      style: TextStyle(
                        fontSize: 16,
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
