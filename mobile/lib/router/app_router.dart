import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/presentation/auth/bloc/register/register_bloc.dart';
import 'package:flutter_template/presentation/auth/register/pin_authen/views/pin_authen_view.dart';
import 'package:flutter_template/presentation/auth/views/login_view.dart';
import 'package:flutter_template/presentation/core/views/root_view.dart';
import 'package:flutter_template/presentation/greeting/views/greeting_view.dart';
import 'package:flutter_template/presentation/splash/splash.dart';

abstract final class AppRouter {
  static const String splash = '/';

  // Auth
  static const String login = '/login';
  static const String register = '/register';
  static const String pinAuthen = '/pin-authen';

  // Root
  static const String root = '/root';

  // static final router = GoRouter(
  //   routes: [
  //     GoRoute(
  //       path: login,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: LoginPage(),
  //         );
  //       },
  //     ),
  //     GoRoute(
  //       path: register,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: RegisterView(),
  //         );
  //       },
  //     ),
  //     GoRoute(
  //       path: root,
  //       pageBuilder: (_, __) {
  //         return const MaterialPage(
  //           child: RootPage(),
  //         );
  //       },
  //     )
  //   ],
  //   initialLocation: login,
  // );

  static Route? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
        return MaterialPageRoute(
          builder: (_) {
            return const SplashPage();
          },
        );
      case login:
        return MaterialPageRoute(
          builder: (_) {
            return const LoginPage();
          },
        );
      case root:
        return MaterialPageRoute(
          builder: (_) {
            return const RootPage();
          },
        );
      case register:
        return MaterialPageRoute(
          builder: (_) {
            return const GreetingView();
          },
        );
      case pinAuthen:
        final arguments = settings.arguments as Map<String, dynamic>;
        final phoneNumber = arguments['phoneNumber'] as String;
        final registerBloc = arguments['registerBloc'] as RegisterBloc;
        return MaterialPageRoute(
          builder: (_) => BlocProvider.value(
            value: registerBloc,
            child: PinAuthenView(phoneNumber: phoneNumber),
          ),
        );

      default:
        return null;
    }
  }
}
