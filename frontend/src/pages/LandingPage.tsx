import PageContainer from '../components/PageContainer';
import PostalCodeInput from '../components/PostalCodeInput';

export default function LandingPage() {
  return (
    <PageContainer>
      <PostalCodeInput redirect='/recipes' />
    </PageContainer>
  );
}
