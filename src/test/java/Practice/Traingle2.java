package Practice;

public class Traingle2 {
	public static void main(String[] args) {
		String s="swamykalaveni";
		int m=0;
		for(int i=0;i<s.length();i++) {
			for(int j=0;j<=i;j++) {
				char c=s.charAt(i);
				System.out.print(c);
			}
			System.out.println();
		}
		for(int i=0;i<=s.length();i++) {
			for(int j=0;j<i;j++) {
				char c=s.charAt(j);
				System.out.print(c);
			}
			System.out.println();
		}
		for(int i=0;i<=s.length();i++) {
			for(int j=0;j<i;j++) {
				if(m<s.length()) {
				char c=s.charAt(m);
				System.out.print(c);
				m=m+1;
				}
			}
			System.out.println();
		}
	}

}
