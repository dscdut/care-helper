import 'package:flutter/material.dart';

class HeaderPhoneInputWidget extends StatelessWidget {
  const HeaderPhoneInputWidget({
    required this.heading1,
    required this.heading2,
    Key? key,
  }) : super(key: key);

  final String heading1;
  final String heading2;

  @override
  Widget build(BuildContext context) {
    const Color accent = Color(0xff112950);

    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            accent,
            Colors.blueAccent,
          ],
        ),
      ),
      height: MediaQuery.of(context).size.height * 0.25,
      width: MediaQuery.of(context).size.width,
      child: Container(
        margin: const EdgeInsets.only(left: 16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              heading1,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 35,
                fontWeight: FontWeight.bold,
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(right: 10),
              child: Text(
                heading2,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
