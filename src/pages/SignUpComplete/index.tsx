import {Button} from '@/components/Button';
import SigmaMdLogo from '@/assets/sigmamd-logo.svg';

const SignUpComplete = () => {
  return (
    <section className="m-auto flex flex-wrap items-center gap-6">
      <aside className="flex max-w-lg flex-col items-start">
        <h1 className="text-5xl">Congratulations! Your Account is Ready</h1>
        <img className="mt-8 block h-8" src={SigmaMdLogo} alt="sigmamd-logo" />
      </aside>
      <aside>
        <div className="flex max-w-md flex-col rounded bg-white p-10 shadow-sm">
          <p>
            <strong>Thank you for joining SigmaMD</strong>
            <br />
            <br />
            You&apos;re ready to jump into an amazing healthcare journey with us
          </p>

          <Button className="mt-6" onClick={() => alert('You reached the end')}>
            Get Started
          </Button>
        </div>
      </aside>
    </section>
  );
};

export default SignUpComplete;
