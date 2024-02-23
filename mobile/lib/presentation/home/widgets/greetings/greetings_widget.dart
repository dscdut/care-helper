import 'package:flutter/material.dart';

class GreetingsWidget extends StatelessWidget {
  const GreetingsWidget({super.key, required this.name});

  final String name;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Hello,',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          Text(
            name,
            style: Theme.of(context)
                .textTheme
                .headlineLarge!
                .copyWith(fontWeight: FontWeight.w800),
          ),
        ],
      ),
    );
  }
}
