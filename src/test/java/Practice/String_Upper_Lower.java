package Practice;

public class String_Upper_Lower {

	public static void main(String[] args) {
		String s="automation Testing";
		int count=0;
		String s1=s.toUpperCase().substring(0,1)+s.toLowerCase().substring(1, 18);
		String s2=s.toLowerCase();
		for(int i=0;i<s.length();i++) {
			count++;
		}
		
		System.out.println(s);
		System.out.println(s1);
		System.out.println(s2);
		System.out.println(count);

	}

}
