//@flow

const REGEXP = /^@[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+-template$/;

export default function(pkgname: string): boolean {
  return REGEXP.test(pkgname);
}
