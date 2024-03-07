import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_template/presentation/auth/bloc/auth_patient/auth_patient_bloc.dart';

part 'splash_event.dart';
part 'splash_state.dart';

class SplashBloc extends Bloc<SplashEvent, SplashState> {
  SplashBloc({required AuthPatientBloc authPatientBloc})
      : _authPatientBloc = authPatientBloc,
        super(const SplashState()) {
    on<SplashStarted>(_onSplashStarted);
    add(SplashStarted());
  }

  final AuthPatientBloc _authPatientBloc;

  Future<void> _onSplashStarted(
    SplashStarted event,
    Emitter<SplashState> emiiter,
  ) async {
    await Future.delayed(const Duration(milliseconds: 600));

    _authPatientBloc.add(AuthPatientInfoCheck());
  }
}
